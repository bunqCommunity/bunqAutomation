import { BadRequestError } from "../Errors";
import { STATUS_PASSWORD_READY } from "../BunqAutomation";

export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;
    const authentication = app.authentication;

    /**
     * Set a new password for fresh installs or attempt to authenticate with existing
     * Will return a valid JWT token which can be used to authenticate for other routes
     */
    app.post("/password", async (request, reply) => {
        if (!request.body || !request.body.password) throw new BadRequestError();

        const apiKey = await authentication.setPassword(request.body.password);

        // check if password is ready and attempt to load API key if that is the case
        if (bunqAutomation.status === STATUS_PASSWORD_READY) {
            await authentication.loadBunqApiKey();
        }

        reply.send({
            api_key: apiKey
        });
    });

    /**
     * Add the API key and environment that will be used
     */
    app.route({
        url: "/api-key",
        method: "POST",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            if (bunqAutomation.status !== STATUS_PASSWORD_READY) {
                throw new BadRequestError("No password set, can't receive bunq API key");
            }

            if (!request.body || !request.body.api_key || !request.body.environment) throw new BadRequestError();

            await authentication.setBunqApiKey(request.body.api_key, request.body.environment);

            reply.send("api-key");
        }
    });

    /**
     * Reset all setup details like passwords and api key
     */
    app.route({
        url: "/reset",
        method: "POST",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            await bunqAutomation.reset();

            reply.send("api-key");
        }
    });

    next();
};
