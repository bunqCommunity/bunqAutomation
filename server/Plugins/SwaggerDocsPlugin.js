const fastifyPlugin = require("fastify-plugin");
const fastifySwagger = require("fastify-swagger");
import packageJson from "../../package";

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
                { name: "setup", description: "Setup bunqAutomation with passwords and API keys" },
                { name: "bunq", description: "bunq endpoints which require an authenticated bunq connection" },
                {
                    name: "public-bunq",
                    description: "bunq endpoints which don't require an authenticated bunq connection"
                }
            ],
            securityDefinitions: {
                apiKey: {
                    type: "apiKey",
                    name: "X-Bunq-Automation-Auth",
                    in: "header"
                }
            }
        }
    });

    next();
};

export default fastifyPlugin(swaggerDocs);
