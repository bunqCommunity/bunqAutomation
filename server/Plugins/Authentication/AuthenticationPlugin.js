const fastifyPlugin = require("fastify-plugin");
import Authentication from "../../Security/Authentication";

const authenticationPlugin = (fastify, options, next) => {
    const authentication = new Authentication(fastify.bunqJSClient, fastify.log);

    fastify.decorate("authentication", authentication);

    next();
};

export default fastifyPlugin(authenticationPlugin);
