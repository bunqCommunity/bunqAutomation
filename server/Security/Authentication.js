const uuid = require("uuid");
import Encryption from "./Encryption";
import LevelDb from "../Storage/LevelDb";
import { UnAuthenticatedError } from "../Errors";
import { STATUS_API_READY, STATUS_PASSWORD_READY, STATUS_UNINITIALIZED } from "../BunqAutomation";

export const PASSWORD_IV_LOCATION = "PASSWORD_IV";
export const PASSWORD_HASH_LOCATION = "PASSWORD_HASH";
export const API_KEY_LOCATION = "API_KEY";
export const API_KEY_IV_LOCATION = "API_KEY_V";
export const ENVIRONMENT_LOCATION = "ENVIRONMENT";

export const API_KEY_HEADER = `x-bunq-automation-authorization`;

export const DEFAULT_API_KEY_EXPIRY_TIME = 60 * 60;

export class Authentication {
    constructor(bunqJSClient, logger) {
        this.bunqJSClient = bunqJSClient;
        this.logger = logger;
        this.encryption = new Encryption();

        this.apiKeyStorage = new LevelDb("api-keys");

        this.encryptionKey = null;
        this.encryptionIv = null;
        this._bunqAutomation = null;
    }

    async startupCheck() {
        // check if a password has been previously set
        const storedPasswordIv = await this.bunqJSClient.storageInterface.get(PASSWORD_IV_LOCATION);
        if (storedPasswordIv) {
            this.bunqAutomation.status = STATUS_UNINITIALIZED;
        }

        // check if
        if (process.env.ENCRYPTION_PASSWORD) {
            this.logger.warn("Attempting to use encryption password from .env file");
            await this.setPassword(process.env.ENCRYPTION_PASSWORD);

            if (this.bunqAutomation.status === STATUS_PASSWORD_READY) {
                await this.loadBunqApiKey();
            }
        }
    }

    async createApiKey() {
        const apiKey = uuid.v4();
        const date = new Date();

        await this.apiKeyStorage.set(apiKey, {
            created: date,
            updated: date
        });

        return apiKey;
    }

    /**
     * Checks if an API key is valid, if it exists but expires it will be deleted
     * @param apiKey        - the API key itself
     * @param refreshApiKey - if true, the updated timestamp will be updated to keep the api key session alive
     * @returns {Promise<boolean>}
     */
    async validateApiKey(apiKey, refreshApiKey = true) {
        const storedApiKey = await this.apiKeyStorage.get(apiKey);
        if (!storedApiKey) return false;

        const currentDate = new Date();
        const expiryDate = new Date(storedApiKey.updated);
        expiryDate.setSeconds(expiryDate.getSeconds() + DEFAULT_API_KEY_EXPIRY_TIME);
        const isValid = currentDate < expiryDate;

        this.logger.debug(`Valid: ${isValid}. Expires in ${Math.round((expiryDate - currentDate) / 1000)} seconds`);

        if (isValid) {
            if (refreshApiKey) {
                await this.refreshApiKey(apiKey);
            }

            return true;
        }
        // remove the API key since it is no longer valid
        await this.apiKeyStorage.remove(apiKey);

        return false;
    }

    /**
     * Updates an API key timestamp to keep a client active
     * @param apiKey
     * @returns {Promise<*>}
     */
    async refreshApiKey(apiKey) {
        const storedApiKey = await this.apiKeyStorage.get(apiKey);
        if (!storedApiKey) return false;
        storedApiKey.updated = new Date();

        return this.apiKeyStorage.set(apiKey, storedApiKey);
    }

    /**
     * Checks if a given IP is allowed
     * @param ip
     * @returns {Promise<boolean>}
     */
    async validateIp(ip) {
        return true;
    }

    /**
     * Setup bunqAutomation with a password,
     * this has to be called first after bunqAutomation starts
     *
     * @param password
     * @returns {Promise<boolean>}
     */
    async setPassword(password) {
        // check if an existing IV value exists
        const storedPasswordIv = await this.bunqJSClient.storageInterface.get(PASSWORD_IV_LOCATION);
        const storedPasswordHash = await this.bunqJSClient.storageInterface.get(PASSWORD_HASH_LOCATION);

        // derive a key from the given password
        const derivedInfo = this.encryption.derivePassword(password, storedPasswordIv || false);
        this.encryptionKey = derivedInfo.key;
        this.encryptionIv = derivedInfo.iv;

        // derive a key from the given password
        const { key: passwordHash } = this.encryption.derivePassword(derivedInfo.key, this.encryptionIv);

        // if a stored password is set and validate it
        if (storedPasswordHash && storedPasswordHash !== passwordHash) {
            throw new UnAuthenticatedError();
        }

        // store the iv and hash values
        await this.bunqJSClient.storageInterface.set(PASSWORD_IV_LOCATION, this.encryptionIv);
        await this.bunqJSClient.storageInterface.set(PASSWORD_HASH_LOCATION, passwordHash);

        // mark as PASSWORD_READY
        this.bunqAutomation.status = STATUS_PASSWORD_READY;

        return true;
    }

    /**
     * Setup bunqAutomation with a bunq API key,
     * will be called automatically if the encryption ENV is used
     * 
     * @param apiKey
     * @param environment
     * @param deviceName
     * @returns {Promise<boolean>}
     */
    async setBunqApiKey(apiKey, environment = "SANDBOX", deviceName = "bunqAutomation") {
        await this.bunqJSClient.run(apiKey, [], environment, this.encryptionKey);

        // disable keep-alive
        this.bunqJSClient.setKeepAlive(false);

        // attempt to register the API key
        await this.bunqJSClient.install();
        await this.bunqJSClient.registerDevice(process.env.DEVICE_NAME || "bunqAutomation");
        await this.bunqJSClient.registerSession();

        // encrypt the API key
        const { iv, encryptedString: encryptedApiKey } = await this.encryption.encrypt(
            apiKey,
            this.encryptionKey,
            this.encryptionIv
        );

        // store the API key and environment
        await this.bunqJSClient.storageInterface.set(API_KEY_LOCATION, encryptedApiKey);
        await this.bunqJSClient.storageInterface.set(API_KEY_IV_LOCATION, iv);
        await this.bunqJSClient.storageInterface.set(ENVIRONMENT_LOCATION, environment);

        // set api status to ready
        this.bunqAutomation.status = STATUS_API_READY;
        return true;
    }

    /**
     * Checks for existing data using the currently stored encryption key
     * @returns {Promise<void>}
     */
    async loadBunqApiKey() {
        const storedEncryptedApiKey = await this.bunqJSClient.storageInterface.get(API_KEY_LOCATION);
        const storedApiKeyIv = await this.bunqJSClient.storageInterface.get(API_KEY_IV_LOCATION);
        const storedEnvironment = await this.bunqJSClient.storageInterface.get(ENVIRONMENT_LOCATION);
        if (!storedEncryptedApiKey || !storedEnvironment || !this.encryptionKey) return;

        // attempt to decrypt the stored apiKey
        const apiKey = await this.encryption.decrypt(storedEncryptedApiKey, this.encryptionKey, storedApiKeyIv);

        if (apiKey) {
            await this.setBunqApiKey(apiKey, storedEnvironment);
        }

        return;
    }

    /**
     * Removes all stored private data and attempts to go back to a "fresh" state as much as possible
     * @returns {Promise<void>}
     */
    async reset() {
        await Promise.all([
            this.bunqJSClient.storageInterface.remove(API_KEY_LOCATION),
            this.bunqJSClient.storageInterface.remove(API_KEY_IV_LOCATION),
            this.bunqJSClient.storageInterface.remove(PASSWORD_IV_LOCATION),
            this.bunqJSClient.storageInterface.remove(ENVIRONMENT_LOCATION)
        ]);
    }

    set bunqAutomation(reference) {
        this._bunqAutomation = reference;
    }
    bunqAutomation() {
        return this._bunqAutomation;
    }
}

export default Authentication;
