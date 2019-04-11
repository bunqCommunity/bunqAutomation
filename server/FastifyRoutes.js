import API from "./API/index.js";

import clientRoutes from "../src/Config/routes";

export default app => {
    app.register((app, opts, next) => {
        // API routes
        app.register(API, { prefix: "/api" });

        clientRoutes.forEach(route => {
            app.get(route.path, { hide: true, hidden: true }, (request, reply) => reply.sendFile("index.html"));
            if (!route.paths) return;

            // loop through extra paths
            route.paths.forEach(path => {
                app.get(path, { hide: true, hidden: true }, (request, reply) => reply.sendFile("index.html"));
            });
        });

        next();
    });
};
