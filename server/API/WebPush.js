const webPush = require("web-push");

export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;

    app.route({
        url: "/subscribe",
        method: "GET",
        handler: async (request, reply) => {
            // TODO store subscribe event in a list

            reply.status(500).send({
                error: "Not implemented"
            });
        }
    });

    app.get("/test-push", (request, reply) => {
        const pushSubscription = JSON.parse("");

        const payload = {
            // ttl: req.body.ttl, // default 4 weeks
            title: "Notification title",
            message: "Notification message!",
            url: process.env.REACT_APP_SERVER_URL,
            // image: req.body.image,
            icon: "/android-chrome-192x192.png",
            badge: "/android-chrome-192x192.png",
            timestamp: new Date().getTime()
        };

        const pushPayload = JSON.stringify(payload);
        const vapidKeys = require("../../storage/vapid-keys.json");

        const pushOptions = {
            vapidDetails: {
                subject: "https://github.com/bunqCommunity/bunqAutomation",
                privateKey: vapidKeys.privateKey,
                publicKey: vapidKeys.publicKey
            },
            headers: {}
        };
        webPush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then(value => {
                console.log({
                    status: true,
                    data: value
                });
            })
            .catch(err => {
                console.log({
                    status: false,
                    data: err
                });
            });
        reply.send("no");
    });

    next();
};
