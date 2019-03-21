const fastifyCompress = require("fastify-compress");
const fastifySwagger = require("fastify-swagger");
const fastfiyResponseTime = require("fastify-response-time");

import packageJson from "../package.json";

import ExampleHelloNamePlugin from "./Plugins/ExampleHelloNamePlugin";

export default app => {
    app.register(fastifyCompress);
    app.register(fastfiyResponseTime, { digits: 3 });

    // https://github.com/fastify/fastify-swagger
    app.register(fastifySwagger, {
        exposeRoute: true,
        swagger: {
            info: {
                title: "Fastify swagger",
                description: "testing the fastify swagger api",
                version: packageJson.version
            },
            host: `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`,
            schemes: ["https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [{ name: "logging", description: "The logging APIs" }],
            securityDefinitions: {
                apiKey: {
                    type: "apiKey",
                    name: "API_KEY_HEADER_KEY",
                    in: "header"
                }
            }
        }
    });

    app.register(ExampleHelloNamePlugin);
};
