import SocketServer from "../SocketServer";
const fastifyPlugin = require("fastify-plugin");

const socketServerPlugin = (fastify, options, next) => {
    const socketServer = new SocketServer(fastify.server);
    socketServer.setup(fastify.bunqAutomation);

    fastify.decorate("socketServer", socketServer);

    next();
};

export default fastifyPlugin(socketServerPlugin);
