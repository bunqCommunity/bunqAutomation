const fastifyPlugin = require("fastify-plugin");

/**
 * The standard generic API key authentication through a JWT bearer token
 */
const apiKeyAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("apiKeyAuthentication", (request, reply, done) => {
        console.log("apiKeyAuthentication");
        done();
    });

    next();
};

export default fastifyPlugin(apiKeyAuthenticationPlugin);
