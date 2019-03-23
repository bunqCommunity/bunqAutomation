const fastifyPlugin = require("fastify-plugin");

/**
 * White list IP addresses
 */
const ipAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("ipAuthentication", (request, reply, next) => {
        next();
    });

    next();
};

export default fastifyPlugin(ipAuthenticationPlugin);
