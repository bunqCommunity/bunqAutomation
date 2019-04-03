import bunqJSClient from "@bunq-community/bunq-js-client";
const fastifyPlugin = require("fastify-plugin");

import BunqAutomation from "../BunqAutomation";
import LevelDb from "../StorageHandlers/LevelDb";

const bunqAutomationPlugin = (fastify, options, next) => {
    const client = new bunqJSClient(new LevelDb("bunq-js-client"))

    const bunqAutomation = new BunqAutomation(client, fastify.authentication, fastify.log);
    bunqAutomation.startupCheck().then(done => {
        fastify.decorate("bunqAutomation", bunqAutomation);

        next();
    });
};

export default fastifyPlugin(bunqAutomationPlugin);
