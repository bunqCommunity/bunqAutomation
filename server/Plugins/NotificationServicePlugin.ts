const fastifyPlugin = require("fastify-plugin");

const notificationServicePlugin = (fastify, options, next) => {
    fastify.decorate("notificationService", fastify.bunqAutomation.notificationService);

    next();
};

export default fastifyPlugin(notificationServicePlugin);
