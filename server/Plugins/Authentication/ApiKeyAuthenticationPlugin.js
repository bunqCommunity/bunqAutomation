const fastifyPlugin = require("fastify-plugin");
import { UnAuthenticatedError } from "../../Errors";

/**
 * The standard generic API key authentication through a JWT bearer token
 */
const apiKeyAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("apiKeyAuthentication", (request, reply, done) => {
        console.log("apiKeyAuthentication");
        throw new UnAuthenticatedError();
    });

    next();
};

export default fastifyPlugin(apiKeyAuthenticationPlugin);
