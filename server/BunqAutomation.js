import Logger from "./Logger";
import Encryption from "./Security/Encryption";

export const PASSWORD_IV_LOCATION = "PASSWORD_IV";
export const API_KEY_LOCATION = "API_KEY";
export const ENVIRONMENT_LOCATION = "ENVIRONMENT";

export const statusList = {
    // noting is ready, no password or api key is set yet
    UNINITIALIZED: "UNINITIALIZED",
    // initialized with a password
    PASSWORD_READY: "PASSWORD_READY",
    // initialized with an API key
    API_READY: "API_READY"
};

export default class BunqAutomation {
    constructor(bunqJSClient) {
        this.bunqJSClient = bunqJSClient;
        this.encryption = new Encryption();

        this.status = statusList.UNINITIALIZED;

        this.encryptionKey = null;
        this.encryptionIv = null;
    }

    async startupCheck() {
        if (process.env.ENCRYPTION_PASSWORD) {
            Logger.debug("Attempting to use encryption password from .env file");
            await this.setPassword(process.env.ENCRYPTION_PASSWORD);

            if (this.status !== statusList.PASSWORD_READY) {
                await this.loadApiKey();
            }
        }
    }

    /**
     * Setup bunqAutomation with a password,
     * this has to be called first after bunqAutomation starts
     *
     * @param password
     * @returns {Promise<void>}
     */
    async setPassword(password) {
        // check if an existing IV value exists
        const storedPasswordIv = await this.bunqJSClient.storageInterface.get(PASSWORD_IV_LOCATION);

        // derive a key from the given password
        const derivedInfo = this.encryption.derivePassword(password, storedPasswordIv || false);
        this.encryptionKey = derivedInfo.key;
        this.encryptionIv = derivedInfo.iv;

        // store the iv value
        await this.bunqJSClient.storageInterface.set(PASSWORD_IV_LOCATION, this.encryptionIv);

        // mark as PASSWORD_READY
        this.status = statusList.PASSWORD_READY;

        return true;
    }

    /**
     * Setup bunqAutomation with a bunq API key,
     * will be called automatically if the encryption ENV is used
     *
     * @param apiKey
     * @param environment
     * @returns {Promise<void>}
     */
    async setApiKey(apiKey, environment = "SANDBOX") {
        // await this.bunqJSClient.run(apiKey, [], environment, this.encryptionKey);
        //
        // // disable keep-alive
        // this.bunqJSClient.setKeepAlive(false);
        //
        // // attempt to register the API key
        // await this.bunqJSClient.install();
        // await this.bunqJSClient.registerDevice(process.env.DEVICE_NAME || "bunqAutomation");
        // await this.bunqJSClient.registerSession();

        // encrypt the API key
        const { iv, encryptedString: encryptedApiKey } = await this.encryption.encrypt(
            apiKey,
            this.encryptionKey,
            this.encryptionIv
        );

        // store the API key and environment
        await this.bunqJSClient.storageInterface.set(API_KEY_LOCATION, encryptedApiKey);
        await this.bunqJSClient.storageInterface.set(`${API_KEY_LOCATION}_IV`, iv);
        await this.bunqJSClient.storageInterface.set(ENVIRONMENT_LOCATION, environment);

        // set api status to ready
        // this.status = statusList.API_READY;
    }

    /**
     * Checks for existing data using the currently stored encryption key
     * @returns {Promise<void>}
     */
    async loadApiKey() {
        const storedEncryptedApiKey = await this.bunqJSClient.storageInterface.get(API_KEY_LOCATION);
        const storedApiKeyIv = await this.bunqJSClient.storageInterface.get(`${API_KEY_LOCATION}_IV`);
        const storedEnvironment = await this.bunqJSClient.storageInterface.get(ENVIRONMENT_LOCATION);
        if (!storedEncryptedApiKey || !storedEnvironment || !this.encryptionKey) return;

        // attempt to decrypt the stored apiKey
        const apiKey = await this.encryption.decrypt(storedEncryptedApiKey, this.encryptionKey, storedApiKeyIv);

        if (apiKey) {
            await this.setApiKey(apiKey, storedEncryptedApiKey);
        }

        return;
    }
}
