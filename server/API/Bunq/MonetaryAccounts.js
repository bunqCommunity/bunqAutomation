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

    const handleBalanceRequest = async (request, reply) => {
        // white list these options so only valid options are sent to bunq api
        const monetaryAccountId = request.params.monetaryAccountId || false;

        // map monetary accounts to basic version output
        const mapMonetaryAccountBalance = monetaryAccount => {
            return {
                id: monetaryAccount.id,
                description: monetaryAccount.description,
                balance: monetaryAccount.balance.value
            };
        };

        // calculate total balance for a list of monetary accounts
        const sumMonetaryAccountBalances = (total, account) => {
            return total + parseFloat(account.balance.value);
        };

        // get monetary accounts
        const monetary_accounts = await app.bunqAutomation.getMonetaryAccounts(request.params.identifier);

        // check if a single account should be returned or all
        if (monetaryAccountId) {
            const monetaryAccount = monetary_accounts.find(monetaryAccount => {
                return monetaryAccount.id === parseFloat(monetaryAccountId);
            });

            if (monetaryAccount) {
                console.log("found", monetaryAccount);

                reply.send({
                    total_balance: [monetaryAccount].reduce(sumMonetaryAccountBalances, 0),
                    monetary_account: [monetaryAccount].map(mapMonetaryAccountBalance)
                });
            } else {
                reply.status(404).send({ error: `Monetary account not found for ID: ${monetaryAccountId}` });
            }
        } else {
            reply.send({
                total_balance: monetary_accounts.reduce(sumMonetaryAccountBalances, 0),
                monetary_accounts: monetary_accounts.map(mapMonetaryAccountBalance)
            });
        }
    };

    app.get(
        "/balance",
        {
            schema: {
                tags: ["bunq"],
                summary: "get the balance for a single monetary account ",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        handleBalanceRequest
    );

    app.get(
        "/balance/:monetaryAccountId",
        {
            schema: {
                tags: ["bunq"],
                summary: "get the balances for all monetary accounts",
                security: [
                    {
                        apiKey: []
                    }
                ]
            }
        },
        handleBalanceRequest
    );

    next();
};
