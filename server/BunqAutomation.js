import Pipeline from "./Automation/Pipeline";

export const STATUS_FIRST_INSTALL = "STATUS_FIRST_INSTALL";
export const STATUS_UNINITIALIZED = "STATUS_UNINITIALIZED";
export const STATUS_PASSWORD_READY = "STATUS_PASSWORD_READY";
export const STATUS_API_READY = "STATUS_API_READY";

export default class BunqAutomation {
    constructor(bunqJSClient, authentication, logger) {
        this.bunqJSClient = bunqJSClient;
        this.authentication = authentication;
        this.logger = logger;
        this.authentication.bunqAutomation = this;
        this.pipeline = new Pipeline();

        // by default set as first install status
        this.status = STATUS_FIRST_INSTALL;
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
}
