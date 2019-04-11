export default (app, opts, next) => {
    app.post(
        "/credentials",
        {
            schema: {
                tags: ["public-bunq"],
                summary: "Creates new login credentials",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            const bunqJSClient = app.bunqAutomation.genericBunqJSClient;

            const { qr_base64, uuid, status } = await bunqJSClient.createCredentials();

            reply.send({
                qr_base64,
                uuid,
                status
            });
        }
    );

    app.get(
        "/credentials/:uuid",
        {
            schema: {
                tags: ["public-bunq"],
                summary: "Checks the status for a given credential",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            const uuid = request.params.uuid;
            const bunqJSClient = app.bunqAutomation.genericBunqJSClient;

            const credentialStatus = await bunqJSClient.checkCredentialStatus(uuid);

            reply.send(credentialStatus);
        }
    );

    app.post(
        "/sandbox-user",
        {
            schema: {
                tags: ["public-bunq"],
                summary: "Creates a new sandbox user and returns the API key",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            const bunqJSClient = app.bunqAutomation.genericBunqJSClient;

            const sandboxDetails = await bunqJSClient.api.sandboxUser.post();

            reply.send(sandboxDetails);
        }
    );

    next();
};
