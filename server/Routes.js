import API from "./API/index.js";

export default app => {
    app.register((app, opts, next) => {
        // API routes
        app.register(API, { prefix: "/api" });

        next();
    });
};
