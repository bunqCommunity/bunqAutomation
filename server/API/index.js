import Bunq from "./Bunq";
import Health from "./Health";
import Setup from "./Setup";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });
    app.register(Setup, { prefix: "/setup" });

    // Authenticated routes
    app.register((app, opts, next) => {
        app.addHook("preHandler", app.auth([app.apiKeyAuthentication]));

        app.register(Bunq, { prefix: "/bunq" });

        next();
    });

    app.get("/test", async (request, reply) => {
        const stored = await app.bunqAutomation.bunqClientWrapper.bunqApiKeyStorage.streamSync();

        reply.send({
            stored: stored,
            loaded: app.bunqAutomation.bunqClientWrapper.getBunqApiKeyList()
        });
    });

    next();
};
