export default (app, opts, next) => {
    const bunqClientWrapper = app.bunqAutomation.bunqClientWrapper;

    app.route({
        url: "/",
        method: "GET",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            reply.send({
                bunq_api_keys: bunqClientWrapper.getBunqApiKeyList()
            });
        }
    });

    next();
};
