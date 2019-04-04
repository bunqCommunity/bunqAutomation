import BunqJSClient from "@bunq-community/bunq-js-client";

import LevelDb from "./StorageHandlers/LevelDb";
import Encryption from "./Security/Encryption";

// import { STATUS_API_READY } from "./BunqAutomation";

// location where the full api key list is stored
export const BUNQ_API_KEYS_LOCATION = "BUNQ_API_KEYS_LOCATION";

// info for the currently selected "main" API key
export const BUNQ_API_KEY_SELECTED = "BUNQ_API_KEY_SELECTED";

class BunqClientWrapper {
    constructor(authentication, logger) {
        this.authentication = authentication;
        this.logger = logger;
        this.encryption = new Encryption();

        this.bunqJSClientStorage = new LevelDb("bunq-js-client");
        this.bunqApiKeyStorage = new LevelDb("bunq-automation-bunq-api-keys");

        // a list of bunq API keys with the unique key as their
        this.bunqApiKeyList = {};
        // which key is currently used by default
        this.selectedBunqApiKeyIdentifier = false;
    }

    /**
     * Setup bunqAutomation with a bunq API key,
     * will be called automatically if the encryption ENV is used
     *
     * @param bunqApiKey
     * @param environment
     * @param deviceName
     * @returns {Promise<boolean>}
     */
    async setBunqApiKey(encryptionKey, bunqApiKey, environment = "SANDBOX", deviceName = "bunqAutomation") {
        const bunqApiKeyIdentifier = this.calculateBunqApiKeyIdentifier(bunqApiKey);

        let bunqApiKeyInfo = {};
        if (this.bunqApiKeyList[bunqApiKeyIdentifier]) {
            bunqApiKeyInfo = this.bunqApiKeyList[bunqApiKeyIdentifier];
        } else {
            bunqApiKeyInfo = {
                bunqJSClient: new BunqJSClient(this.bunqJSClientStorage, this.logger),
                environment,
                deviceName
            };
        }

        await bunqApiKeyInfo.bunqJSClient.run(bunqApiKey, [], environment, encryptionKey);

        // disable keep-alive
        bunqApiKeyInfo.bunqJSClient.setKeepAlive(false);

        // attempt to register the API key
        await bunqApiKeyInfo.bunqJSClient.install();
        await bunqApiKeyInfo.bunqJSClient.registerDevice(deviceName || "bunqAutomation");
        await bunqApiKeyInfo.bunqJSClient.registerSession();

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

        // TODO store the API key and environment

        // TODO set api status to ready
        // this.bunqAutomation.status = STATUS_API_READY;
        return true;
    }

    /**
     * Checks for existing data using the currently stored encryption key
     * @returns {Promise<void>}
     */
    async loadBunqApiKey(bunqApiKeyIdentifier) {
        // const storedEncryptedApiKey = await this.bunqApiKeyStorage.get(BUNQ_API_KEY_LOCATION);
        // const storedApiKeyIv = await this.bunqApiKeyStorage.get(BUNQ_API_KEY_IV_LOCATION);
        // const storedEnvironment = await this.bunqApiKeyStorage.get(ENVIRONMENT_LOCATION);
        // if (!storedEncryptedApiKey || !storedEnvironment || !this.encryptionKey) return;
        //
        // // attempt to decrypt the stored apiKey
        // const apiKey = await this.encryption.decrypt(storedEncryptedApiKey, this.encryptionKey, storedApiKeyIv);
        //
        // if (apiKey) {
        //     await this.setBunqApiKey(apiKey, storedEnvironment);
        // }

        return;
    }

    /**
     * Should only be run once on startup!
     * @returns {Promise<void>}
     */
    async loadStoredBunqApiKeys() {
        const loadedBunqApiKeys = await this.bunqApiKeyStorage.get(BUNQ_API_KEYS_LOCATION);
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

        await this.bunqApiKeyStorage.set(BUNQ_API_KEYS_LOCATION, mappedBunqApiKeys);
    }

    async switchBunqApiKey(identifier) {}

    calculateBunqApiKeyIdentifier(bunqApiKey) {
        const splitKey = bunqApiKey.substring(0, 32);
        const derivedInfo = this.encryption.derivePassword(splitKey, "bcb77ac4736bc503d8dbdee79a5c3a04", 16, 50000);
        return derivedInfo.key;
    }

    async reset() {
        await Promise.all([]);
    }
}

export default BunqClientWrapper;
