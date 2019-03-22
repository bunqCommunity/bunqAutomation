import Health from "./Health";
import Setup from "./Setup";
import AuthenticatedRouteTest from "./AuthenticatedRouteTest";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });
    app.register(Setup, { prefix: "/setup" });

    // Authenticated routes
    app.register((app, opts,next) => {
        app.register(AuthenticatedRouteTest, { prefix: "/a" });

        next();
    })

    next();
};
