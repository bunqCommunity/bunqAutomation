export default (app, opts, next) => {
    app.post("/credentials", async (request, reply) => {
        const bunqJSClient = app.bunqAutomation.genericBunqJSClient;

        const { qr_base64, uuid, status } = await bunqJSClient.createCredentials();

        reply.send({
            qr_base64,
            uuid,
            status
        });
    });

    app.get("/credentials/:uuid", async (request, reply) => {
        const uuid = request.params.uuid;
        const bunqJSClient = app.bunqAutomation.genericBunqJSClient;

        const credentialStatus = await bunqJSClient.checkCredentialStatus(uuid);

        reply.send(credentialStatus);
    });

    app.post("/sandbox-user", async (request, reply) => {
        const bunqJSClient = app.bunqAutomation.genericBunqJSClient;

        const sandboxDetails = await bunqJSClient.api.sandboxUser.post();

        reply.send(sandboxDetails);
    });

    next();
};
