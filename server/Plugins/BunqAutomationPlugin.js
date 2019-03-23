const fastifyPlugin = require("fastify-plugin");
import BunqAutomation from "../BunqAutomation";

const bunqAutomationPlugin = (fastify, options, next) => {
    const bunqAutomation = new BunqAutomation(fastify.bunqJSClient, fastify.authentication, fastify.log);
    bunqAutomation.startupCheck().then(done => {
        fastify.decorate("bunqAutomation", bunqAutomation);

        next();
    });
};

export default fastifyPlugin(bunqAutomationPlugin);
