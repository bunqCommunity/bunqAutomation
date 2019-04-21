import { swaggerSecuritySchema } from "../Plugins/SwaggerDocsPlugin";

export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;
    const bunqClientWrapper = bunqAutomation.bunqClientWrapper;

    app.route({
        url: "/bunq-api-keys",
        method: "GET",
        schema: {
            summary: "get the currently stored bunq API keys",
            tags: ["server-management"],
            security: swaggerSecuritySchema
        },
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            reply.send({
                bunq_api_keys: bunqClientWrapper.getBunqApiKeyList()
            });
        }
    });

    app.route({
        url: "/bunq-api-data",
        method: "GET",
        schema: {
            summary: "get the currently stored bunq API data in memory",
            tags: ["server-management"],
            security: swaggerSecuritySchema
        },
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            reply.send(bunqAutomation.bunqApiData);
        }
    });

    app.route({
        url: "/monetary-accounts/colors",
        method: "POST",
        schema: {
            // summary: "get the currently stored bunq API data in memory",
            // tags: ["server-management"],
            security: swaggerSecuritySchema
        },
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            const colors = request.body;

            reply.send(colors);
        }
    });

    next();
};
