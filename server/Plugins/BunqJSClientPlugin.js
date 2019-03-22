const fastifyPlugin = require("fastify-plugin");
import bunqJSClient from "@bunq-community/bunq-js-client";

const bunqJSClientPlugin = (fastify, options, next) => {
    fastify.decorate("bunqJSClient", new bunqJSClient(fastify.levelDb));

    next();
};

export default fastifyPlugin(bunqJSClientPlugin);
