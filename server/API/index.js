import Automation from "./Automation";
import Bunq from "./Bunq";
import BunqApiKeys from "./Managment";
import Health from "./Health";
import PublicBunq from "./PublicBunq";
import Setup from "./Setup";
import WebPush from "./WebPush";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });
    app.register(Setup, { prefix: "/setup" });
    app.register(WebPush, { prefix: "/web-push" });

    // Authenticated routes
    app.register((app, opts, next) => {
        app.addHook("preHandler", app.auth([app.apiKeyAuthentication]));

        app.register(Automation, { prefix: "/automation" });
        app.register(Bunq, { prefix: "/bunq/:identifier" });
        app.register(BunqApiKeys, { prefix: "/management" });
        app.register(PublicBunq, { prefix: "/bunq-public" });

        next();
    });

    next();
};
