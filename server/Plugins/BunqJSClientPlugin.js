const fastifyPlugin = require("fastify-plugin");
import * as path from "path";
import bunqJSClient from "@bunq-community/bunq-js-client";
import JSONFileStore from "@bunq-community/bunq-js-client/dist/Stores/JSONFileStore";

function bunqJSClientPlugin(fastify, options, next) {
    const storageInterface = JSONFileStore(
        `${__dirname}${path.sep}..${path.sep}..${path.sep}${process.env.BUNQJSCLIENT_DATA_LOCATION}`
    );

    fastify.decorate("bunqJSClient", new bunqJSClient(storageInterface));

    next();
}

export default fastifyPlugin(bunqJSClientPlugin);
