export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;

    /**
     * Set a new password for fresh installs or attempt to authenticate with existing
     * Will return a valid JWT token which can be used to authenticate for other routes
     */
    app.get("/password", async (request, reply) => {
        await bunqAutomation.setPassword("testpassword1234");

        // check if password is ready and attempt to load API key if that is the case
        if (bunqAutomation.status === bunqAutomation.statusList.PASSWORD_READY) {
            await bunqAutomation.loadApiKey();
        }

        console.log(bunqAutomation.status);
        reply.send("password");
    });

    /**
     * Add the API key and environment that will be used
     */
    app.route({
        url: "/api-key",
        method: "GET",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            // await bunqAutomation.setApiKey("Fake_Api_Key", "SANDBOX");

            reply.send("api-key");
        }
    });

    /**
     * Reset all setup details like passwords and api key
     */
    app.route({
        url: "/reset",
        method: "GET",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            await bunqAutomation.reset();

            reply.send("api-key");
        }
    });

    next();
};
