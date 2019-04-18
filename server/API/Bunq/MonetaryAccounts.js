export default (app, opts, next) => {
    app.get(
        "/",
        {
            schema: {
                tags: ["bunq"],
                summary: "get the bunq monetary accounts",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        async (request, reply) => {
            // white list these options so only valid options are sent to bunq api
            const whitelistedQueryOptions = ["count", "newer_id", "older_id"];

            const options = {};
            if (request.query) {
                Object.keys(request.query).forEach(key => {
                    if (whitelistedQueryOptions.includes(key)) {
                        options[key] = request.query[key];
                    }
                });
            }

            const monetary_accounts = await app.bunqAutomation.getMonetaryAccounts(request.params.identifier, options);

            reply.send({
                monetary_accounts: monetary_accounts
            });
        }
    );

    next();
};
