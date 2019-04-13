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
                action: "BALANCE_WARNING",
                options: {
                    allAccounts: true
                },
                outputs: [
                    {
                        type: "CONSOLE_MESSAGE",
                        schedule: "INSTANT"
                    }
                ]
            };

            const result = pipeline.updateAction(config);

            reply.send({ result: result });
        }
    );

    next();
};
