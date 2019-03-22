import Health from "./Health";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });

    app.get("/", async (request, reply) => {
        await app.bunqAutomation.setPassword("testpassword1234");

        await app.bunqAutomation.setApiKey("Fake_Api_Key");

        if (app.bunqAutomation.status === "PASSWORD_READY") await app.bunqAutomation.loadApiKey();

        reply.code(200).send("alive");
    });

    next();
};
