import { UnAuthenticatedError } from "../Errors";
import {STATUS_PASSWORD_READY} from "../BunqAutomation";

export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;
    const authentication = app.authentication;

    /**
     * Set a new password for fresh installs or attempt to authenticate with existing
     * Will return a valid JWT token which can be used to authenticate for other routes
     */
    app.post("/password", async (request, reply) => {
        if (!request.body || !request.body.password) throw new UnAuthenticatedError();

        const password = request.body.password;
        const apiKey = await authentication.setPassword(password);

        console.log("Received API key", apiKey);

        // check if password is ready and attempt to load API key if that is the case
        if (bunqAutomation.status === STATUS_PASSWORD_READY) {
            await authentication.loadBunqApiKey();
        }

        console.log(bunqAutomation.status);
        reply.send("password");
    });

    /**
     * Add the API key and environment that will be used
     */
    app.route({
        url: "/api-key",
        method: "POST",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            // await bunqAutomation.setBunqApiKey("Fake_Api_Key", "SANDBOX");

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
