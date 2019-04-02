const fastifyPlugin = require("fastify-plugin");
import bunqJSClient from "@bunq-community/bunq-js-client";

import LevelDb from "../StorageHandlers/LevelDb";

const bunqJSClientPlugin = (fastify, options, next) => {
    fastify.decorate("bunqJSClient", new bunqJSClient(new LevelDb("bunq-js-client")));

    next();
};

export default fastifyPlugin(bunqJSClientPlugin);
