const uuid = require("uuid");
import Encryption from "./Encryption";
import LevelDb from "../StorageHandlers/LevelDb";
import { UnAuthenticatedError } from "../Errors";
import { STATUS_API_READY, STATUS_PASSWORD_READY, STATUS_UNINITIALIZED } from "../BunqAutomation";

export const PASSWORD_IV_LOCATION = "PASSWORD_IV";
export const PASSWORD_HASH_LOCATION = "PASSWORD_HASH";

export const BUNQ_API_KEY_HEADER = `x-bunq-automation-authorization`;
export const DEFAULT_API_KEY_EXPIRY_TIME = 60 * 60;

export class Authentication {
    constructor(logger) {
        this.logger = logger;
        this.encryption = new Encryption();

        this.apiKeyStorage = new LevelDb("bunq-automation-api-keys");
        this.authenticationStorage = new LevelDb("bunq-automation-authentication");

        this.encryptionKey = null;
        this.encryptionIv = null;

        this.hasStoredPassword = false;
    }

    async startup() {
        // check if a password has been previously set
        const storedPasswordIv = await this.authenticationStorage.get(PASSWORD_IV_LOCATION);
        const storedPasswordHash = await this.authenticationStorage.get(PASSWORD_HASH_LOCATION);

        this.hasStoredPassword = !!storedPasswordIv && !!storedPasswordHash;
    }

    /**
     * Creates a new bunqAutomation API key
     * @returns {Promise<*>}
     */
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
        if (!storedApiKey) {
            return false;
        }

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
     * Setup bunqAutomation with a password,
     * this has to be called first after bunqAutomation starts
     *
     * @param password
     * @returns {Promise<boolean>}
     */
    async setPassword(password) {
        // check if an existing IV value exists
        const storedPasswordIv = await this.authenticationStorage.get(PASSWORD_IV_LOCATION);
        const storedPasswordHash = await this.authenticationStorage.get(PASSWORD_HASH_LOCATION);

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
        await this.authenticationStorage.set(PASSWORD_IV_LOCATION, this.encryptionIv);
        await this.authenticationStorage.set(PASSWORD_HASH_LOCATION, passwordHash);

        return true;
    }

    /**
     * Removes all stored private data and attempts to go back to a "fresh" state as much as possible
     * @returns {Promise<void>}
     */
    async reset() {
        await Promise.all([
            this.authenticationStorage.remove(PASSWORD_IV_LOCATION),
            this.authenticationStorage.remove(PASSWORD_HASH_LOCATION)
        ]);
    }
}

export default Authentication;
