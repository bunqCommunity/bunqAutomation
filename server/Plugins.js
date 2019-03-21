import * as path from "path";
const fastifyCompress = require("fastify-compress");
const fastifySwagger = require("fastify-swagger");
const fastifyHelmet = require("fastify-helmet");
const fastfiyResponseTime = require("fastify-response-time");
const fastifyStatic = require("fastify-static");

import packageJson from "../package.json";

import ExampleHelloNamePlugin from "./Plugins/ExampleHelloNamePlugin";

export default app => {
    app.register(fastifyCompress);
    app.register(fastifyHelmet);
    app.register(fastfiyResponseTime, { digits: 3 });
    app.register(fastifyStatic, {
        root: `${__dirname}${path.sep}..${path.sep}public`
    });

    // https://github.com/fastify/fastify-swagger
    app.register(fastifySwagger, {
        exposeRoute: true,
        swagger: {
            info: {
                title: "bunqAutomation documentation",
                description: "The bunqAutomation API documentation",
                version: packageJson.version
            },
            host: `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`,
            schemes: ["https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [{ name: "example", description: "Example description for the example tag" }],
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
