import BunqJSClient from "@bunq-community/bunq-js-client";
import LoggerInterface from "@bunq-community/bunq-js-client/dist/Interfaces/LoggerInterface";
import RequestLimitFactory from "@bunq-community/bunq-js-client/dist/RequestLimitFactory";

import LevelDb from "./StorageHandlers/LevelDb";
import Encryption from "./Security/Encryption";

// location where the full api key list is stored
export const BUNQ_API_KEYS_LOCATION = "BUNQ_API_KEYS_LOCATION";

// properties which can be shared with the client safely
// TODO add icon picker E.G. https://material.io/tools/icons/static/data.json
const publicBunqApiKeyProperties = ["environment", "deviceName", "icon", "color", "errorState"];

class BunqClientWrapper {
    public logger: LoggerInterface;
    public encryption: Encryption;

    public bunqJSClientStorage: LevelDb;
    public bunqApiKeyStorage: LevelDb;

    public genericBunqJSClient: BunqJSClient;
    public requestLimitFactory: RequestLimitFactory;

    public bunqApiKeyList: any;

    constructor(logger) {
        this.logger = logger;
        this.encryption = new Encryption();

        this.bunqJSClientStorage = new LevelDb("bunq-js-client");
        this.bunqApiKeyStorage = new LevelDb("bunq-automation-bunq-api-keys");

        // create an empty client to do api calls to non-authenticated endpoints E.G. create sandbox user
        this.genericBunqJSClient = new BunqJSClient(this.bunqJSClientStorage, this.logger);
        this.requestLimitFactory = this.genericBunqJSClient.ApiAdapter.RequestLimitFactory;

        // a list of bunq API keys with the unique key as their
        this.bunqApiKeyList = {};
    }

    /**
     * Returns a bunqJSClient by the given identifier
     * @returns {boolean|boolean|BunqJSClient|*}
     */
    getBunqJSClient(identifier) {
        if (this.bunqApiKeyList[identifier]) {
            const selectedBunqApiKey = this.bunqApiKeyList[identifier];

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

        let bunqApiKeyInfo: any = {};
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
     * Remove a stored key by its identifier
     * @param encryptionKey
     * @param identifier
     * @returns {Promise<void>}
     */
    async removeBunqApiKey(encryptionKey, identifier) {
        if (this.bunqApiKeyList[identifier]) {
            delete this.bunqApiKeyList[identifier];

            // update the new list
            await this.storeBunqApiKeys();
        }
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
    async setupBunqJSClient(
        encryptionKey,
        bunqApiKey,
        environment,
        deviceName,
        existingClient: false | BunqJSClient = false
    ) {
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
     * @returns {Promise<boolean>}
     */
    async loadStoredBunqApiKeys(encryptionKey) {
        const loadedBunqApiKeys = await this.bunqApiKeyStorage.get(BUNQ_API_KEYS_LOCATION);
        if (!loadedBunqApiKeys) return false;

        const setupErrors = [];
        await Promise.all(
            Object.keys(loadedBunqApiKeys).map(async identifier => {
                const bunqApiKeyInfo = {
                    ...loadedBunqApiKeys[identifier],
                    bunqJSClient: this.bunqApiKeyList[identifier]
                        ? this.bunqApiKeyList[identifier].bunqJSClient
                        : false,
                    errorState: false
                };

                // ensure certain props exist
                if (!bunqApiKeyInfo.icon) bunqApiKeyInfo.icon = "vpn_key";
                if (!bunqApiKeyInfo.color) bunqApiKeyInfo.color = "inherit";

                const decryptedApikey = await this.encryption.decrypt(
                    bunqApiKeyInfo.encryptedApiKey,
                    encryptionKey,
                    bunqApiKeyInfo.encryptionIv
                );

                // setup and refresh the bunqJSclient if required
                await new Promise(resolve => {
                    this.setupBunqJSClient(
                        encryptionKey,
                        decryptedApikey,
                        bunqApiKeyInfo.environment,
                        bunqApiKeyInfo.deviceName,
                        bunqApiKeyInfo.bunqJSClient
                    )
                        .then(bunqJSClient => {
                            bunqApiKeyInfo.bunqJSClient = bunqJSClient;

                            this.bunqApiKeyList[identifier] = bunqApiKeyInfo;
                            resolve();
                        })
                        .catch(error => {
                            bunqApiKeyInfo.errorState = error;
                            setupErrors.push(error);

                            this.bunqApiKeyList[identifier] = bunqApiKeyInfo;
                            resolve();
                        });
                });
            })
        );

        return {
            errors: setupErrors
        };
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
                encryptionIv: bunqApiKeyInfo.encryptionIv,
                encryptedApiKey: bunqApiKeyInfo.encryptedApiKey
            };
            publicBunqApiKeyProperties.forEach(safeProperty => {
                if (bunqApiKeyInfo[safeProperty]) {
                    mappedBunqApiKey[safeProperty] = bunqApiKeyInfo[safeProperty];
                }
            });

            mappedBunqApiKeys[bunqApiKeyIdentifier] = mappedBunqApiKey;
        });

        await this.bunqApiKeyStorage.set(BUNQ_API_KEYS_LOCATION, mappedBunqApiKeys, false);
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
     * Gets a "safe" list to be returned by the API
     */
    getBunqApiKeyList() {
        const bunqApiKeyList = {};

        Object.keys(this.bunqApiKeyList).forEach(bunqApiKeyIdentifier => {
            const bunqApiKeyInfo = this.bunqApiKeyList[bunqApiKeyIdentifier];
            const mappedBunqApiKey = {};

            publicBunqApiKeyProperties.forEach(safeProperty => {
                if (bunqApiKeyInfo[safeProperty]) {
                    mappedBunqApiKey[safeProperty] = bunqApiKeyInfo[safeProperty];
                }
            });

            bunqApiKeyList[bunqApiKeyIdentifier] = mappedBunqApiKey;
        });

        return bunqApiKeyList;
    }

    /**
     * @returns {Promise<void>}
     */
    async reset() {
        await Promise.all([this.bunqApiKeyStorage.remove(BUNQ_API_KEYS_LOCATION)]);
    }
}

export default BunqClientWrapper;
