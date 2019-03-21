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
            reply.code(200).send("alive");
        }
    );

    next();
};
