export default (app, opts, next) => {
    app.route({
        url: "/subscribe",
        method: "POST",
        schema: {
            tags: ["web-push"]
        },
        handler: async (request, reply) => {
            await app.notificationService.subscribeWebPush(request.body);

            reply.status(200).send({
                status: "success"
            });
        }
    });

    app.route({
        url: "/test-push",
        method: "GET",
        schema: {
            tags: ["web-push"]
        },
        handler: async (request, reply) => {
            await app.notificationService.notify("My title", "A longer message text");

            reply.send("Done");
        }
    });

    next();
};
