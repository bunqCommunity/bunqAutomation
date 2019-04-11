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

            const formattedObjects = [];
            monetary_accounts.forEach(monetaryAccount => {
                const accountType = Object.keys(monetaryAccount)[0];
                const monetaryAccountInfo = monetaryAccount[accountType];
                monetaryAccountInfo.accountType = accountType;

                formattedObjects.push(monetaryAccountInfo);
            });

            reply.send({
                monetary_accounts: formattedObjects
            });
        }
    );

    next();
};
