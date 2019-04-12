import API from "./API/index.js";

import clientRoutes from "../src/Config/routes";

export default app => {
    app.register((app, opts, next) => {
        // API routes
        app.register(API, { prefix: "/api" });

        clientRoutes.forEach(route => {
            app.route({
                url: route.path,
                method: "GET",
                schema: {
                    tags: ["front-end"]
                },
                handler: (request, reply) => reply.sendFile("index.html")
            });
            if (!route.paths) return;

            // loop through extra paths
            route.paths.forEach(path => {
                app.route({
                    url: path,
                    method: "GET",
                    schema: {
                        tags: ["front-end"]
                    },
                    handler: (request, reply) => reply.sendFile("index.html")
                });
            });
        });

        next();
    });
};
