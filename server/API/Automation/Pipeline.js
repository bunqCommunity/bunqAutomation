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
                options: {
                    balance: 8000
                },
                filters: {
                    filterId1: {
                        type: "MONETARY_ACCOUNT",
                        filterValues: [8370]
                    }
                },
                outputs: {
                    outputId1: {
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
