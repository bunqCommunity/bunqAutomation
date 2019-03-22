export default (app, opts, next) => {
    app.get(
        "/",
        {
            schema: {
                description: "get the API health status",
                tags: [],
                summary: "get the API health status",
                response: {
                    200: {
                        description: "Successful response",
                        type: "string"
                    }
                },
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            console.log("Health check:", app.bunqAutomation.status);
            reply.code(200).send({
                status: app.bunqAutomation.status
            });
        }
    );

    next();
};
