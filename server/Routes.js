import API from "./API/index.js";

export default app => {
    app.register((app, opts, next) => {
        app.addHook("preHandler", app.auth([app.ipAuthentication]));

        // API routes
        app.register(API, { prefix: "/api" });

        next();
    });
};
