import Health from "./Health";
import Setup from "./Setup";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });
    app.register(Setup, { prefix: "/setup" });

    // Authenticated routes
    app.register((app, opts,next) => {

        next();
    })

    next();
};
