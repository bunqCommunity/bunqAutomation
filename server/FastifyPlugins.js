import * as path from "path";
const fastifyCompress = require("fastify-compress");
const fastifyHelmet = require("fastify-helmet");
const fastifyAuth = require("fastify-auth");
const fastifyStatic = require("fastify-static");
const fastifyCors = require("fastify-cors");
import SwaggerDocsPlugin from "./Plugins/SwaggerDocsPlugin";
import BunqAutomationPlugin from "./Plugins/BunqAutomationPlugin";
import AuthenticationPlugin from "./Plugins/Authentication/AuthenticationPlugin";
import ApiKeyAuthenticationPlugin from "./Plugins/Authentication/ApiKeyAuthenticationPlugin";
import SchemaRegistrationPlugin from "./Plugins/SchemaRegistrationPlugin";
import SocketServerPlugin from "./Plugins/SocketServerPlugin";

export default app => {
    app.register(fastifyCompress);
    app.register(fastifyHelmet);
    app.register(fastifyCors);
    app.register(fastifyAuth);
    app.register(fastifyStatic, {
        root: `${__dirname}${path.sep}..${path.sep}build`
    });

    app.register(SwaggerDocsPlugin);
    app.register(SchemaRegistrationPlugin);

    app.register(AuthenticationPlugin);
    app.register(ApiKeyAuthenticationPlugin);

    app.register(BunqAutomationPlugin);
    app.register(SocketServerPlugin);
};
