import Bunq from "./Bunq";
import BunqApiKeys from "./BunqApiKeys";
import Health from "./Health";
import Setup from "./Setup";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });
    app.register(Setup, { prefix: "/setup" });

    // Authenticated routes
    app.register((app, opts, next) => {
        app.addHook("preHandler", app.auth([app.apiKeyAuthentication]));

        app.register(Bunq, { prefix: "/bunq" });
        app.register(BunqApiKeys, { prefix: "/bunq-api-keys" });

        next();
    });

    next();
};
