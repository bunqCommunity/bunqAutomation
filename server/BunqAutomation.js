import Pipeline from "./Automation/Pipeline";
import FileStore from "./Storage/FileStore";

export const STATUS_FIRST_INSTALL = "STATUS_FIRST_INSTALL";
export const STATUS_UNINITIALIZED = "STATUS_UNINITIALIZED";
export const STATUS_PASSWORD_READY = "STATUS_PASSWORD_READY";
export const STATUS_API_READY = "STATUS_API_READY";

class BunqAutomation {
    constructor(bunqJSClient, authentication, logger) {
        this.bunqJSClient = bunqJSClient;
        this.authentication = authentication;
        this.logger = logger;
        this.authentication.bunqAutomation = this;
        this.pipeline = new Pipeline();
        this.fileStore = new FileStore();

        // by default set as first install status
        this.status = STATUS_FIRST_INSTALL;

        // bunq user info
        this.user = false;
    }

    async startupCheck() {
        await this.authentication.startupCheck();
    }

    /**
     * Removes all stored private data and attempts to go back to a "fresh" state as much as possible
     * @returns {Promise<void>}
     */
    async reset() {
        await Promise.all([this.authentication.reset()]);
    }

    /**
     * Retrieves the bunq user info
     * @params {boolean} forceUpdate
     * @returns {Promise<void>}
     */
    async getUser(forceUpdate = false) {
        const users = await this.bunqJSClient.getUsers(forceUpdate);
        const userType = Object.keys(users)[0];

        this.user = users[userType];

        return this.user;
    }

    /**
     * Fetches a bunq image by uuid and caches it
     * @param imageUuid
     * @returns {Promise<Promise<any>|any>}
     */
    async getImage(imageUuid) {
        const storedImage = await this.fileStore.exists(imageUuid);
        if (storedImage) return storedImage;

        const imageContents = this.bunqJSClient.api.attachmentContent.get(imageUuid, {
            base64: false
        });
        this.fileStore.write(imageUuid, imageContents)
            .then(() => {})
            .catch(error => {
                this.logger.warn("Failed to write file!");
                this.logger.warn(error);
            });

        return imageContents;
    }
}

export default BunqAutomation;
