import RateLimitPlugin from "../Plugins/Authentication/RateLimitPlugin";

export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;

    // rate limit the setup endpoints
    RateLimitPlugin(app, 5);

    app.route({
        url: "/",
        method: "GET",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            reply.send({
                stored: await app.bunqAutomation.bunqClientWrapper.bunqApiKeyStorage.get("BUNQ_API_KEYS_LOCATION"),
                selected: await app.bunqAutomation.bunqClientWrapper.bunqApiKeyStorage.get("BUNQ_API_KEY_SELECTED"),
                loaded: app.bunqAutomation.bunqClientWrapper.getBunqApiKeyList()
            });
        }
    });

    app.route({
        url: "/:bunqApiKeyIdentifier",
        method: "POST",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            const bunqApiKeyIdentifier = request.params.bunqApiKeyIdentifier;

            // switch the default key for the endpoints
            await bunqAutomation.bunqClientWrapper.switchBunqApiKey(bunqApiKeyIdentifier);

            reply.send({ bunqApiKeyIdentifier });
        }
    });

    next();
};
