import Pipeline from "./Automation/Pipeline";
import FileStore from "./StorageHandlers/FileStore";
import LevelDb from "./StorageHandlers/LevelDb";

import {
    BunqJSClientNotReadyError,
    NoBunqApiKeyError,
    NoBunqApiKeyIdentifierError,
    NoPasswordSetError
} from "./Errors";
import BunqClientWrapper from "./BunqClientWrapper";
import Authentication from "./Security/Authentication";

export const STATUS_FIRST_INSTALL = "STATUS_FIRST_INSTALL";
export const STATUS_UNINITIALIZED = "STATUS_UNINITIALIZED";
export const STATUS_PASSWORD_READY = "STATUS_PASSWORD_READY";
export const STATUS_API_READY = "STATUS_API_READY";

class BunqAutomation {
    constructor(logger) {
        this.logger = logger;
        this.fileStore = new FileStore();
        this.settingsStore = new LevelDb("bunq-automation-settings");

        this.pipeline = new Pipeline(this.logger);
        this.authentication = new Authentication(this.logger);
        this.bunqClientWrapper = new BunqClientWrapper(this.logger);

        // set a reference in the authentication handler
        this.authentication.bunqAutomation = this;

        // socket server is optional
        this.socketServer = false;

        // by default set as first install status
        this._status = STATUS_FIRST_INSTALL;

        // bunq user info
        this.user = false;
    }

    async startup() {
        // check authentication inital startup status
        await this.authentication.startup();

        if (this.authentication.hasStoredPassword) {
            // if a previous password has been saved, set uninitialzed status (versus first install)
            this.status = STATUS_UNINITIALIZED;
        }

        // check for hardcoded encryption password env value
        if (process.env.ENCRYPTION_PASSWORD) {
            this.logger.warn("Attempting to use encryption password from .env file");
            await this.setPassword(process.env.ENCRYPTION_PASSWORD);
        }
        if (this.authentication.encryptionKey) {
            // if a key has been loaded, set password ready state
            this.status = STATUS_PASSWORD_READY;
        }

        // check bunqClient inital startup status
        await this.bunqClientWrapper.startup(this.authentication.encryptionKey);
    }

    /**
     * Standard check around API calls
     * @param keyIdentifier
     * @returns {Promise<boolean>}
     */
    async isApiReadyCheck(keyIdentifier) {
        if (this.status === STATUS_API_READY) {
            if (!keyIdentifier) {
                throw new NoBunqApiKeyIdentifierError();
            } else if (keyIdentifier && !this.bunqClientWrapper.getBunqJSClient(keyIdentifier)) {
                throw new BunqJSClientNotReadyError();
            }
            return true;
        }

        switch (this.status) {
            case STATUS_FIRST_INSTALL:
            case STATUS_UNINITIALIZED:
                throw new NoPasswordSetError();
            case STATUS_PASSWORD_READY:
                throw new NoBunqApiKeyError();
        }

        return true;
    }

    /**
     * Wrappers around nested classes to update the bunqAutomation status correctly
     * @param password
     * @returns {Promise<void>}
     */
    async setPassword(password) {
        const result = await this.authentication.setPassword(password);
        if (result) this.status = STATUS_PASSWORD_READY;
    }
    async addBunqApiKey(bunqApiKey, environment, deviceName) {
        const result = await this.bunqClientWrapper.addBunqApiKey(
            this.authentication.encryptionKey,
            bunqApiKey,
            environment,
            deviceName
        );
        if (result) this.status = STATUS_API_READY;
    }
    async loadStoredBunqApiKeys() {
        const result = await this.bunqClientWrapper.loadStoredBunqApiKeys(this.authentication.encryptionKey);
        if (result) this.status = STATUS_API_READY;
    }

    // wraps around the bunqclientwrapper to get the active client
    get bunqJSClient() {
        return this.bunqClientWrapper.bunqJSClient;
    }
    get genericBunqJSClient() {
        return this.bunqClientWrapper.genericBunqJSClient;
    }

    /**
     * Get active user for given key
     * @param keyIdentifier
     * @param forceUpdate
     * @returns {Promise<boolean>}
     */
    async getUser(keyIdentifier, forceUpdate = false) {
        await this.isApiReadyCheck(keyIdentifier);

        const client = this.bunqClientWrapper.getBunqJSClient(keyIdentifier);
        const users = await client.getUsers(forceUpdate);
        const userType = Object.keys(users)[0];

        this.user = users[userType];

        return this.user;
    }

    /**
     * Get events
     * @param keyIdentifier
     * @param options
     * @returns {Promise<any>}
     */
    async getEvents(keyIdentifier, options = {}) {
        await this.isApiReadyCheck(keyIdentifier);

        const user = await this.getUser();

        const client = this.bunqClientWrapper.getBunqJSClient(keyIdentifier);
        return await client.api.event.list(user.id, options);
    }

    /**
     * Get monetary accounts
     * @param keyIdentifier
     * @param options
     * @returns {Promise<any>}
     */
    async getMonetaryAccounts(keyIdentifier, options = {}) {
        await this.isApiReadyCheck(keyIdentifier);

        const user = await this.getUser();

        const client = this.bunqClientWrapper.getBunqJSClient(keyIdentifier);
        return await client.api.monetaryAccount.list(user.id, options);
    }

    /**
     * Fetches a bunq image by uuid and caches it
     * @param keyIdentifier
     * @param imageUuid
     * @returns {Promise<any>}
     */
    async getImage(keyIdentifier, imageUuid) {
        await this.isApiReadyCheck(keyIdentifier);

        const imageFileName = `${imageUuid}.png`;
        const storedImage = await this.fileStore.exists(imageFileName);
        if (storedImage) {
            return this.fileStore.stream(imageFileName);
        }

        const client = this.bunqClientWrapper.getBunqJSClient(keyIdentifier);
        const imageContents = await client.api.attachmentContent.get(imageUuid, {
            base64: false
        });

        // cache image in file store
        this.fileStore
            .write(imageFileName, imageContents)
            .then(() => {})
            .catch(error => {
                this.logger.warn("Failed to write file!");
                this.logger.warn(error);
            });

        return imageContents;
    }

    // wrappers around the status property to update connected clients
    set status(status) {
        this._status = status;
        if (this.socketServer) {
            // emit the new status to all socket clients
            this.socketServer.emit("status", this.status);
        }
    }
    get status() {
        console.log("bunqAutomation.status = ", this._status);
        return this._status;
    }

    // TODO export and import all stored data to/from json
    async export() {}
    async import() {}

    async reset() {
        await Promise.all([this.pipeline.reset(), this.bunqClientWrapper.reset(), this.authentication.reset()]);
    }
}

export default BunqAutomation;
