const fastifyPlugin = require("fastify-plugin");
import BunqAutomation from "../BunqAutomation";

function bunqAutomationPlugin(fastify, options, next) {
    const bunqAutomation = new BunqAutomation(fastify.bunqJSClient);
    bunqAutomation.startupCheck().then(done => {
        fastify.decorate("bunqAutomation", bunqAutomation);

        next();
    });
}

export default fastifyPlugin(bunqAutomationPlugin);
