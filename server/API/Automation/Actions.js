import { swaggerSecuritySchema } from "../../Plugins/SwaggerDocsPlugin";

export default (app, opts, next) => {
    app.get(
        "/",
        {
            schema: {
                tags: ["automation"],
                // summary: "get the bunq events",
                security: swaggerSecuritySchema
            }
        },
        async (request, reply) => {
            const pipeline = app.bunqAutomation.pipeline;

            reply.send(pipeline.actions);
        }
    );

    next();
};
