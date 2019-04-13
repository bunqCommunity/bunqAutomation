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

    next();
};
