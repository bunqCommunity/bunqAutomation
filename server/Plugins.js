import * as path from "path";
const fastifyCompress = require("fastify-compress");
const fastifySwagger = require("fastify-swagger");
const fastifyHelmet = require("fastify-helmet");
const fastifyAuth = require("fastify-auth");
const fastifyStatic = require("fastify-static");
const fastifyCors = require("fastify-cors");
import packageJson from "../package.json";
import LevelDbPlugin from "./Plugins/LevelDbPlugin";
import BunqJSClientPlugin from "./Plugins/BunqJSClientPlugin";
import BunqAutomationPlugin from "./Plugins/BunqAutomationPlugin";
import AuthenticationPlugin from "./Plugins/Authentication/AuthenticationPlugin";
import ApiKeyAuthenticationPlugin from "./Plugins/Authentication/ApiKeyAuthenticationPlugin";
import IPAuthenticationPlugin from "./Plugins/Authentication/IPAuthenticationPlugin";

export default app => {
    app.register(fastifyCompress);
    app.register(fastifyHelmet);
    app.register(fastifyCors);
    app.register(fastifyAuth);
    app.register(fastifyStatic, {
        root: `${__dirname}${path.sep}..${path.sep}build`
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

    app.register(LevelDbPlugin);
    app.register(BunqJSClientPlugin);
    app.register(AuthenticationPlugin);
    app.register(ApiKeyAuthenticationPlugin);
    app.register(IPAuthenticationPlugin);
    app.register(BunqAutomationPlugin);
};
