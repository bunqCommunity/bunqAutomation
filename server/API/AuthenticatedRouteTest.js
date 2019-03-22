export default (app, opts, next) => {
    app.get("/", async (request, reply) => {
        reply.send("Authenticated");
    });

    next();
};
