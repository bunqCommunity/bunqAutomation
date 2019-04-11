import RateLimitPlugin from "../Plugins/Authentication/RateLimitPlugin";

export default (app, opts, next) => {
    const bunqClientWrapper = app.bunqAutomation.bunqClientWrapper;

    // rate limit the setup endpoints
    RateLimitPlugin(app, 5);

    app.route({
        url: "/",
        method: "GET",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            reply.send({
                stored: await bunqClientWrapper.bunqApiKeyStorage.get("BUNQ_API_KEYS_LOCATION"),
                selected: await bunqClientWrapper.bunqApiKeyStorage.get("BUNQ_API_KEY_SELECTED"),
                loaded: bunqClientWrapper.getBunqApiKeyList()
            });
        }
    });

    next();
};
