import InitPipeline from "../Automation/Init";

const fastifyPlugin = require("fastify-plugin");

import BunqAutomation from "../BunqAutomation";

const bunqAutomationPlugin = (fastify, options, next) => {
    const bunqAutomation = new BunqAutomation(fastify.log);
    bunqAutomation.startup(fastify.server).then(done => {
        fastify.decorate("bunqAutomation", bunqAutomation);

        // register our custom things in bunqAutomation
        InitPipeline(bunqAutomation.pipeline)
            .then(() => {
                next();
            })
            .catch(error => {
                console.error(error);
                next(error);
            });
    });
};

export default fastifyPlugin(bunqAutomationPlugin);
