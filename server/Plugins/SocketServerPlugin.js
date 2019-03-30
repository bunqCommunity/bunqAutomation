import SocketServer from "../SocketServer";
const fastifyPlugin = require("fastify-plugin");

const socketServerPlugin = (fastify, options, next) => {
    const socketServer = new SocketServer(fastify.server, fastify.bunqAutomation);
    socketServer.connect();

    fastify.decorate("socketServer", socketServer);

    next();
};

export default fastifyPlugin(socketServerPlugin);
