export default (app, opts, next) => {
    app.get(
        "/",
        {
            schema: {
                tags: ["bunq"],
                summary: "get the bunq events",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            const options = {};

            // white list these options so only valid options are sent to bunq api
            const whitelistedQueryOptions = [
                "count",
                "newer_id",
                "older_id",
                "monetary_account_id",
                "display_user_event",
                "status"
            ];
            if (request.query) {
                Object.keys(request.query).forEach(key => {
                    if (whitelistedQueryOptions.includes(key)) {
                        options[key] = request.query[key];
                    }
                });
            }

            const events = await app.bunqAutomation.getEvents(request.params.identifier, options);

            reply.send({
                events: events
            });
        }
    );

    next();
};
