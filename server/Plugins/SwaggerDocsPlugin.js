const fastifyPlugin = require("fastify-plugin");
const fastifySwagger = require("fastify-swagger");
import packageJson from "../../package";

export const swaggerSecuritySchema = [
    {
        apiKey: []
    }
];

const swaggerDocs = (fastify, options, next) => {
    // https://github.com/fastify/fastify-swagger
    fastify.register(fastifySwagger, {
        exposeRoute: true,
        swagger: {
            info: {
                title: "bunqAutomation API",
                description: "The bunqAutomation API documentation",
                version: packageJson.version
            },
            host: `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`,
            // schemes: ["https","http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                {
                    name: "automation",
                    description: "Manage and view the different automation options and tasks"
                },
                { name: "bunq", description: "bunq endpoints which require an authenticated bunq connection" },
                {
                    name: "bunq-public",
                    description: "bunq endpoints which don't require an authenticated bunq connection"
                },
                {
                    name: "server-management",
                    description: "Endpoints to check and manage the server status"
                },
                { name: "setup", description: "Setup bunqAutomation with passwords and API keys" },
                {
                    name: "web-push",
                    description: "Browser subscription management for web push"
                }
            ],
            securityDefinitions: {
                apiKey: {
                    type: "apiKey",
                    name: "x-bunq-automation-authorization",
                    in: "header"
                }
            }
        }
    });

    next();
};

export default fastifyPlugin(swaggerDocs);
