import LevelDb from "./StorageHandlers/LevelDb";

const webPush = require("web-push");
import vapidKeys from "../storage/vapid-keys.json";
import Encryption from "./Security/Encryption";

class NotificationService {
    constructor(socketServer) {
        this.socketServer = socketServer;
        this.encryption = new Encryption();
        this.notificationStore = new LevelDb("bunq-automation-notifications");

        this.webPushOptions = {
            vapidDetails: {
                subject: "https://github.com/bunqCommunity/bunqAutomation",
                privateKey: vapidKeys.privateKey,
                publicKey: vapidKeys.publicKey
            }
        };

        this.standardWebPushPayload = {
            // ttl: req.body.ttl, // default 4 weeks
            // image: req.body.image,
            url: process.env.REACT_APP_SERVER_URL,
            icon: "/android-chrome-192x192.png",
            badge: "/android-chrome-192x192.png",
            timestamp: new Date().getTime()
        };
    }

    /**
     * Emits a notification to both the sockets and web push subscribers
     * @param title
     * @param message
     * @returns {Promise<void>}
     */
    async notify(title, message = "") {
        this.socketEmit("notification", { title, message });

        await this.emitWebPushAll({ title, message });
    }

    /**
     * Emits event to all socket clients
     * @param data
     */
    socketEmit(eventType, data) {
        if (this.socketServer) return;

        this.socketServer.emit(eventType, data);
    }

    /**
     * Emits a push event to all subscribers
     * @param payload
     * @returns {Promise}
     */
    async emitWebPushAll(payload) {
        const formattedPayload = this.formatWebPushPayload(payload);

        // list all subscribers
        const subscribers = await this.notificationStore.streamSync();

        // go through each and wait for them to complete
        const emittedPushEvents = await Promise.all(
            Object.keys(subscribers).map(subscriberId => {
                const subscription = subscribers[subscriberId];

                return this.emitSubscriberWebPush(subscription.data, formattedPayload);
            })
        );

        return emittedPushEvents;
    }

    /**
     * Emits a push event to all subscribers
     * @param subscription
     * @param payload
     * @returns {Promise}
     */
    async emitSubscriberWebPush(subscription, payload) {
        const formattedPayload = this.formatWebPushPayload(payload);
        const stringifiedPayload = JSON.stringify(formattedPayload);

        return await webPush.sendNotification(subscription, stringifiedPayload, this.webPushOptions);
    }

    /**
     * Register a new web push subscription
     */
    async subscribeWebPush(subscription) {
        const jsonSubscription = JSON.stringify(subscription);

        // quickly create a fixed key for the subscription
        const subscriptionIdentifier = await this.encryption.derivePassword(
            jsonSubscription,
            "bcb77ac4736bc503d8dbdee79a5c3a04",
            32,
            10000
        );

        // store the subscription in the list
        await this.notificationStore.set(subscriptionIdentifier.key, {
            data: subscription,
            created: new Date()
        });
    }

    /**
     * Combines custom web push options with the system default
     * @param options
     */
    formatWebPushPayload(options) {
        return {
            ...this.standardWebPushPayload,
            ...options
        };
    }
}

export default NotificationService;
