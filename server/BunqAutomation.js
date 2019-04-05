import Pipeline from "./Automation/Pipeline";
import FileStore from "./StorageHandlers/FileStore";
import LevelDb from "./StorageHandlers/LevelDb";

import { NoBunqApiKeyError, NoPasswordSetError } from "./Errors";
import BunqClientWrapper from "./BunqClientWrapper";

export const STATUS_FIRST_INSTALL = "STATUS_FIRST_INSTALL";
export const STATUS_UNINITIALIZED = "STATUS_UNINITIALIZED";
export const STATUS_PASSWORD_READY = "STATUS_PASSWORD_READY";
export const STATUS_API_READY = "STATUS_API_READY";

class BunqAutomation {
    constructor(authentication, logger) {
        this.authentication = authentication;
        this.logger = logger;
        this.pipeline = new Pipeline(this.logger);
        this.fileStore = new FileStore();
        this.bunqClientWrapper = new BunqClientWrapper(this.logger);
        this.settingsStore = new LevelDb("bunq-automation-settings");

        // set a reference in the authentication handler
        this.authentication.bunqAutomation = this;

        // socket server is optional
        this.socketServer = false;

        // by default set as first install status
        this._status = STATUS_FIRST_INSTALL;

        // bunq user info
        this.user = false;
    }

    async startupCheck() {
        await this.authentication.startupCheck();

        // if authentication resulted in a loaded password, attempt to load the apikeys
        if (this.status === STATUS_PASSWORD_READY) {
            await this.bunqClientWrapper.loadStoredBunqApiKeys();
        }
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
        return this._status;
    }

    /**
     * Removes all stored private data and attempts to go back to a "fresh" state as much as possible
     * @returns {Promise<void>}
     */
    async reset() {
        await Promise.all([this.authentication.reset()]);
    }

    /**
     * Standard check around API calls
     * @returns {Promise<boolean>}
     */
    async isApiReadyCheck() {
        if (this.status === STATUS_API_READY) return true;

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
     * Retrieves the bunq user info
     * @params {boolean} forceUpdate
     * @returns {Promise<void>}
     */
    async getUser(forceUpdate = false) {
        await this.isApiReadyCheck();

        // TODO get user info
        // const users = await this.bunqJSClient.getUsers(forceUpdate);
        const userType = Object.keys(users)[0];

        this.user = users[userType];

        return this.user;
    }

    /**
     * Fetches a bunq image by uuid and caches it
     * @param imageUuid
     * @returns {Promise<any>}
     */
    async getImage(imageUuid) {
        await this.isApiReadyCheck();

        const imageFileName = `${imageUuid}.png`;
        const storedImage = await this.fileStore.exists(imageFileName);
        if (storedImage) {
            return this.fileStore.stream(imageFileName);
        }

        // TODO get updated image from bunq API
        const imageContents = await this.bunqJSClient.api.attachmentContent.get(imageUuid, {
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
}

export default BunqAutomation;
