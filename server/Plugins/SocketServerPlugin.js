const fastifyPlugin = require("fastify-plugin");

const socketServerPlugin = (fastify, options, next) => {
    fastify.decorate("socketServer", fastify.bunqAutomation.socketServer);

    next();
};

export default fastifyPlugin(socketServerPlugin);
