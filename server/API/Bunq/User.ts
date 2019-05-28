export default (app, opts, next) => {
    app.get(
        "/",
        {
            schema: {
                tags: ["bunq"],
                summary: "get the bunq user connected to the API key",
                response: {
                    200: {
                        description: "Successful response",
                        type: "object",
                        properties: {
                            user: {
                                $ref: "bunqUser"
                            }
                        }
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
            const forceUpdate = request.query && request.query.forceUpdate;

            const userInfo = await app.bunqAutomation.getUser(request.params.identifier, forceUpdate);

            reply.send({
                user: userInfo
            });
        }
    );

    next();
};
