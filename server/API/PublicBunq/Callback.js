export default (app, opts, next) => {
    app.post(
        "/",
        {
            schema: {
                tags: ["bunq-public"],
                summary: "Callback endpoint for bunq notification filters",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            console.log(request.body);

            reply.send({ status: "OK" });
        }
    );

    next();
};
