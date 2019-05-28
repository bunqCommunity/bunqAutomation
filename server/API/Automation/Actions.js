import { swaggerSecuritySchema } from "../../Plugins/SwaggerDocsPlugin";

export default (app, opts, next) => {
    app.get(
        "/",
        {
            schema: {
                tags: ["automation"],
                summary: "List all Actions",
                security: swaggerSecuritySchema
            }
        },
        async (request, reply) => {
            const pipeline = app.bunqAutomation.pipeline;

            reply.send(pipeline.actions);
        }
    );

    // app.get(
    //     "/configure",
    //     {
    //         schema: {
    //             tags: ["automation"],
    //             // summary: "get the bunq events",
    //             security: swaggerSecuritySchema
    //         }
    //     },
    //     async (request, reply) => {
    //         const pipeline = app.bunqAutomation.pipeline;
    //
    //         // configure something
    //         const result = await pipeline.configureAction(request.body.actionConfig);
    //
    //         reply.send(result);
    //     }
    // );

    next();
};
