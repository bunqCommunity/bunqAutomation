import LoggerInterface from "@bunq-community/bunq-js-client/dist/Interfaces/LoggerInterface";

import Pipeline from "./Automation/Pipeline";
import FileStore from "./StorageHandlers/FileStore";

import {
    BunqJSClientNotReadyError,
    NoBunqApiKeyError,
    NoBunqApiKeyIdentifierError,
    NoPasswordSetError
} from "./Errors";
import Authentication from "./Security/Authentication";
import BunqClientWrapper from "./BunqClientWrapper";
import NotificationService from "./NotificationService";
import PaymentLoader from "./PaymentLoader";
import Settings from "./Settings";
import SocketServer from "./SocketServer";

export const STATUS_FIRST_INSTALL = "STATUS_FIRST_INSTALL";
export const STATUS_UNINITIALIZED = "STATUS_UNINITIALIZED";
export const STATUS_PASSWORD_READY = "STATUS_PASSWORD_READY";
export const STATUS_API_READY = "STATUS_API_READY";

export const PROXY_SETTINGS = "PROXY_SETTINGS";

class BunqAutomation {
    public logger: LoggerInterface;
    public fileStore: FileStore;

    public socketServer: SocketServer;
    public paymentLoader: PaymentLoader;
    public settings: Settings;
    public pipeline: Pipeline;
    public authentication: Authentication;
    public bunqClientWrapper: BunqClientWrapper;
    public notificationService: NotificationService;

    private _status: string;

    public bunqApiData: any;

    constructor(logger: LoggerInterface) {
        this.logger = logger;
        this.fileStore = new FileStore();

        this.socketServer = new SocketServer(this);
        this.paymentLoader = new PaymentLoader(this);
        this.settings = new Settings(this.logger);
        this.pipeline = new Pipeline(this.logger);
        this.authentication = new Authentication(this.logger);
        this.bunqClientWrapper = new BunqClientWrapper(this.logger);
        this.notificationService = new NotificationService(this.logger, this.socketServer);

        // by default set as first install status
        this._status = STATUS_FIRST_INSTALL;

        // api data stored under the bunq api key identifier
        this.bunqApiData = {};
    }

    async startup(httpServer) {
        // start the socket server and bind it to the http server
        await this.socketServer.setup(httpServer);

        // check startup methods
        await this.authentication.startup();
        await this.settings.startup();

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
        await this.loadStoredBunqApiKeys();
        await this.loadStoredProxyDetails();

        // check bunqClient inital startup status
        await this.pipeline.startup();
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

        this.settings.encryptionKey = this.authentication.encryptionKey;
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

    async loadStoredProxyDetails() {
        const proxySettings = await this.settings.getValue(PROXY_SETTINGS);
        if (proxySettings) {
            this.bunqClientWrapper.requestLimitFactory.setEnabledProxies(proxySettings);
        }
    }
    async setProxyDetails(proxyDetails) {
        await this.settings.setValue(PROXY_SETTINGS, proxyDetails);
        this.bunqClientWrapper.requestLimitFactory.setEnabledProxies(proxyDetails);
    }

    // wraps around the bunqclientwrapper to get the active client
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

        // cache data for this identifier in memory
        if (!this.bunqApiData[keyIdentifier]) this.bunqApiData[keyIdentifier] = {};
        this.bunqApiData[keyIdentifier].user = users[userType];

        return users[userType];
    }

    /**
     * Get events
     * @param keyIdentifier
     * @param options
     * @returns {Promise<any>}
     */
    async getEvents(keyIdentifier, options = {}) {
        await this.isApiReadyCheck(keyIdentifier);

        const user = await this.getUser(keyIdentifier);

        const client = this.bunqClientWrapper.getBunqJSClient(keyIdentifier);
        const events = await client.api.event.list(user.id, options);

        // cache data for this identifier in memory
        if (!this.bunqApiData[keyIdentifier]) this.bunqApiData[keyIdentifier] = {};
        this.bunqApiData[keyIdentifier].events = events;

        return events;
    }

    /**
     * Get monetary accounts
     * @param keyIdentifier
     * @param options
     * @returns {Promise<Array>}
     */
    async getMonetaryAccounts(keyIdentifier, options = {}) {
        await this.isApiReadyCheck(keyIdentifier);
        const client = this.bunqClientWrapper.getBunqJSClient(keyIdentifier);

        const user = await this.getUser(keyIdentifier);
        const monetaryAccounts = await client.api.monetaryAccount.list(user.id, options);

        const monetaryAccountColors = await this.settings.getMonetaryAccountColors();

        const formattedAccounts = [];
        monetaryAccounts.forEach(monetaryAccount => {
            const accountType = Object.keys(monetaryAccount)[0];
            const monetaryAccountInfo = monetaryAccount[accountType];
            monetaryAccountInfo.accountType = accountType;

            const accountColor = monetaryAccountColors[monetaryAccountInfo.id];
            if (accountColor) monetaryAccountInfo.color = accountColor;

            formattedAccounts.push(monetaryAccountInfo);
        });

        // cache data for this identifier in memory
        if (!this.bunqApiData[keyIdentifier]) this.bunqApiData[keyIdentifier] = {};
        this.bunqApiData[keyIdentifier].monetaryAccounts = formattedAccounts;

        return formattedAccounts;
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
        // emit the new status to all socket clients
        if (this.socketServer) this.socketServer.emit("status", this.status);
    }
    get status() {
        return this._status;
    }

    // TODO export and import all stored data to/from json
    async export() {}
    async import() {}

    async reset() {
        await Promise.all([
            this.pipeline.reset(),
            this.bunqClientWrapper.reset(),
            this.authentication.reset(),
            this.settings.reset()
        ]);
    }
}

export default BunqAutomation;
