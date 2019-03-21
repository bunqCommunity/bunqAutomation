import API from "./API/index.js";

export default app => {
    // API routes
    app.register(API, { prefix: "/api" });

    // fallback to 404 page
    app.setNotFoundHandler((request, reply) => {
        reply.code(404).send({ error: "not found" });
    });
};
