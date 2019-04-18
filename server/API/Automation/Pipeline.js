import { swaggerSecuritySchema } from "../../Plugins/SwaggerDocsPlugin";

export default (app, opts, next) => {
    app.get(
        "/available",
        {
            schema: {
                tags: ["automation"],
                summary: "List the available actions, filters, outputs and actions",
                security: swaggerSecuritySchema
            }
        },
        async (request, reply) => {
            const pipeline = app.bunqAutomation.pipeline;

            reply.send({
                actions: pipeline.actions,
                filters: pipeline.filters,
                outputs: pipeline.outputs,
                schedules: pipeline.schedules
            });
        }
    );

    app.get(
        "/active",
        {
            schema: {
                tags: ["automation"],
                summary: "List the currently active actions",
                security: swaggerSecuritySchema
            }
        },
        async (request, reply) => {
            const pipeline = app.bunqAutomation.pipeline;

            reply.send(pipeline.activeActions);
        }
    );

    app.get(
        "/test",
        {
            schema: {
                tags: ["automation"],
                summary: "test route",
                security: swaggerSecuritySchema
            }
        },
        async (request, reply) => {
            const pipeline = app.bunqAutomation.pipeline;

            const config = {
                active: false,
                uuid: "800f9e55-e007-4dbe-8f27-ec460c344b6d",
                action: "BALANCE_WARNING",
                users: [3059],
                children: ["e3fff355-c080-4f98-b7e7-5196e4a1fd04", "7f0a4813-92a6-4bc6-a133-6c315b1ac6d9"],
                options: {
                    balance: 8000
                },
                filters: {
                    "e3fff355-c080-4f98-b7e7-5196e4a1fd04": {
                        children: ["32191185-918f-44e2-b2ef-4f6c6ed0656e"],
                        type: "MONETARY_ACCOUNT",
                        filterValues: [5060]
                    },

                    // split for testing but could be used as 1 filter with [5060, 8370]
                    "7f0a4813-92a6-4bc6-a133-6c315b1ac6d9": {
                        children: ["32191185-918f-44e2-b2ef-4f6c6ed0656e"],
                        type: "MONETARY_ACCOUNT",
                        filterValues: [8370]
                    }
                },
                outputs: {
                    "32191185-918f-44e2-b2ef-4f6c6ed0656e": {
                        type: "CONSOLE_MESSAGE",
                        schedule: { type: "INSTANT" }
                    }
                }
            };

            const result = pipeline.actionConfigFromJson(config);

            reply.send(result);
        }
    );

    next();
};
