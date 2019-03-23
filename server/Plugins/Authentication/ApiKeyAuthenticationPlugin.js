const fastifyPlugin = require("fastify-plugin");
import { UnAuthenticatedError } from "../../Errors";
import { API_KEY_HEADER } from "../../Security/Authentication";

/**
 * The standard generic API key authentication through a JWT bearer token
 */
const apiKeyAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("apiKeyAuthentication", (request, reply, done) => {
        const headers = request.headers;
        console.log(headers[API_KEY_HEADER]);

        // fastify.authentication.validateApiKey(headers[API_KEY_HEADER]);
        done(new UnAuthenticatedError());
    });

    next();
};

export default fastifyPlugin(apiKeyAuthenticationPlugin);
