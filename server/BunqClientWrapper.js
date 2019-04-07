import BunqJSClient from "@bunq-community/bunq-js-client";
import BunqJSClientLimiter from "@bunq-community/bunq-js-client/dist/RequestLimitFactory";

import LevelDb from "./StorageHandlers/LevelDb";
import Encryption from "./Security/Encryption";

// location where the full api key list is stored
export const BUNQ_API_KEYS_LOCATION = "BUNQ_API_KEYS_LOCATION";

// info for the currently selected "main" API key
export const BUNQ_API_KEY_SELECTED = "BUNQ_API_KEY_SELECTED";

class BunqClientWrapper {
    constructor(logger) {
        this.logger = logger;
        this.encryption = new Encryption();

        this.bunqJSClientStorage = new LevelDb("bunq-js-client");
        this.bunqApiKeyStorage = new LevelDb("bunq-automation-bunq-api-keys");

        // create a custom bunqJSClient limiter so it can be shared
        this.requestLimitFactory = new BunqJSClientLimiter();

        // create an empty client to do api calls to non-authenticated endpoints E.G. create sandbox user
        this.genericBunqJSClient = new BunqJSClient(this.bunqJSClientStorage);

        // a list of bunq API keys with the unique key as their
        this.bunqApiKeyList = {};
        // which key is currently used by default
        this.selectedBunqApiKeyIdentifier = false;
    }

    async startupCheck(encryptionKey = false) {
        const selectedBunqApiKey = await this.bunqApiKeyStorage.get(BUNQ_API_KEY_SELECTED);
        if (selectedBunqApiKey) {
            this.selectedBunqApiKeyIdentifier = selectedBunqApiKey;
        }

        if (encryptionKey) {
            await this.loadStoredBunqApiKeys(encryptionKey);
        }
    }

    /**
     * Set a different bunq API key as the default and store the selection
     * @param identifier
     * @returns {Promise<void>}
     */
    async switchBunqApiKey(identifier) {
        this.selectedBunqApiKeyIdentifier = identifier;
        await this.bunqApiKeyStorage.set(BUNQ_API_KEY_SELECTED, identifier);
    }

    /**
     * Returns false or the currently selected api client
     * @returns {boolean|boolean|BunqJSClient|*}
     */
    get bunqJSClient() {
        if (this.bunqApiKeyList[this.selectedBunqApiKeyIdentifier]) {
            const selectedBunqApiKey = this.bunqApiKeyList[this.selectedBunqApiKeyIdentifier];
            if (selectedBunqApiKey.bunqJSClient) {
                return selectedBunqApiKey.bunqJSClient;
            }
        }
        return false;
    }

    /**
     * Setup bunqAutomation with a new bunq API key,
     * will be called automatically if the encryption ENV is used
     *
     * @param bunqApiKey
     * @param environment
     * @param deviceName
     * @returns {Promise<boolean>}
     */
    async addBunqApiKey(encryptionKey, bunqApiKey, environment = "SANDBOX", deviceName = "bunqAutomation") {
        const bunqApiKeyIdentifier = this.calculateBunqApiKeyIdentifier(bunqApiKey);

        let bunqApiKeyInfo = {};
        if (this.bunqApiKeyList[bunqApiKeyIdentifier]) {
            bunqApiKeyInfo = this.bunqApiKeyList[bunqApiKeyIdentifier];
        } else {
            bunqApiKeyInfo = {
                bunqJSClient: false,
                errorState: false,
                environment,
                deviceName
            };
        }

        // setup and refresh the bunqJSclient if required
        bunqApiKeyInfo.bunqJSClient = await this.setupBunqJSClient(
            encryptionKey,
            bunqApiKey,
            environment,
            deviceName,
            bunqApiKeyInfo.bunqJSClient
        );

        // encrypt the API key
        const { iv: encryptionIv, encryptedString: encryptedApiKey } = await this.encryption.encrypt(
            bunqApiKey,
            encryptionKey
        );

        // add details to the package
        bunqApiKeyInfo.encryptionIv = encryptionIv;
        bunqApiKeyInfo.encryptedApiKey = encryptedApiKey;

        // overwrite the existing details if any
        this.bunqApiKeyList[bunqApiKeyIdentifier] = bunqApiKeyInfo;

        // store the updated list
        await this.storeBunqApiKeys();

        return true;
    }

    /**
     * Creates a new client or refreshes existing client and returns it
     * @param encryptionKey
     * @param bunqApiKey
     * @param environment
     * @param deviceName
     * @param existingClient
     * @returns {Promise<BunqJSClient>}
     */
    async setupBunqJSClient(encryptionKey, bunqApiKey, environment, deviceName, existingClient = false) {
        const bunqJSClient =
            existingClient instanceof BunqJSClient
                ? existingClient
                : new BunqJSClient(this.bunqJSClientStorage, this.logger);

        // overwrite the request factory with our custom version
        bunqJSClient.ApiAdapter.RequestLimitFactory = this.requestLimitFactory;

        await bunqJSClient.run(bunqApiKey, [], environment, encryptionKey);

        // disable keep-alive
        bunqJSClient.setKeepAlive(false);

        // setup API calls
        await bunqJSClient.install();
        await bunqJSClient.registerDevice(deviceName);
        await bunqJSClient.registerSession();

        return bunqJSClient;
    }

    /**
     * Should only be run once on startup!
     * @returns {Promise<boolean>}
     */
    async loadStoredBunqApiKeys(encryptionKey) {
        const loadedBunqApiKeys = await this.bunqApiKeyStorage.get(BUNQ_API_KEYS_LOCATION);
        return false;

        // const setupErrors = [];
        // await Promise.all(
        //     Object.keys(loadedBunqApiKeys).map(async identifier => {
        //         const bunqApiKeyInfo = {
        //             ...loadedBunqApiKeys[identifier],
        //             bunqJSClient: false,
        //             errorState: false
        //         };
        //
        //         // setup and refresh the bunqJSclient if required
        //         await new Promise(resolve => {
        //             this.setupBunqJSClient(
        //                 encryptionKey,
        //                 bunqApiKeyInfo.bunqApiKey,
        //                 bunqApiKeyInfo.environment,
        //                 bunqApiKeyInfo.deviceName,
        //                 bunqApiKeyInfo.bunqJSClient
        //             )
        //                 .then(bunqJSClient => {
        //                     bunqApiKeyInfo.bunqJSClient = bunqJSClient;
        //                     resolve();
        //                 })
        //                 .catch(error => {
        //                     bunqApiKeyInfo.errorState = error;
        //                     setupErrors.push(errors);
        //
        //                     // resolve so all clients are tried in paralel
        //                     resolve();
        //                 });
        //         });
        //     })
        // );
    }

    /**
     * Stores the current bunqApiKey list into storage
     * @returns {Promise<void>}
     */
    async storeBunqApiKeys() {
        const mappedBunqApiKeys = {};
        Object.keys(this.bunqApiKeyList).forEach(bunqApiKeyIdentifier => {
            const bunqApiKeyInfo = this.bunqApiKeyList[bunqApiKeyIdentifier];

            // map only values that we know that can be stored safely
            const mappedBunqApiKey = {
                environment: bunqApiKeyInfo.environment,
                deviceName: bunqApiKeyInfo.deviceName,
                encryptionIv: bunqApiKeyInfo.encryptionIv,
                encryptedApiKey: bunqApiKeyInfo.encryptedApiKey
            };

            mappedBunqApiKeys[bunqApiKeyIdentifier] = mappedBunqApiKey;
        });

        console.log("Stored list", mappedBunqApiKeys);
        await this.bunqApiKeyStorage.set(BUNQ_API_KEYS_LOCATION, mappedBunqApiKeys, false);

        const storedStream = await this.bunqApiKeyStorage.streamSync();
        console.log(storedStream);
    }

    /**
     * Creates a unique but anonymous key for a bunq API key
     * @param bunqApiKey
     */
    calculateBunqApiKeyIdentifier(bunqApiKey) {
        const splitKey = bunqApiKey.substring(0, 32);
        const derivedInfo = this.encryption.derivePassword(splitKey, "bcb77ac4736bc503d8dbdee79a5c3a04", 16, 50000);
        return derivedInfo.key;
    }

    /**
     * @returns {Promise<void>}
     */
    async reset() {
        await Promise.all([
            this.bunqApiKeyStorage.remove(BUNQ_API_KEYS_LOCATION),
            this.bunqApiKeyStorage.remove(BUNQ_API_KEY_SELECTED)
        ]);
    }
}

export default BunqClientWrapper;
