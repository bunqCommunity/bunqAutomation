const fastifyPlugin = require("fastify-plugin");
import { UnAuthenticatedError } from "../../Errors";
import { API_KEY_HEADER } from "../../Security/Authentication";

/**
 * The standard generic API key authentication through a header
 */
const apiKeyAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("apiKeyAuthentication", (request, reply, done) => {
        const headers = request.headers;
        const query = request.query;

        // get either value but prefer header
        const apiKey = headers[API_KEY_HEADER] || query.api_key;

        fastify.authentication
            .validateApiKey(apiKey)
            .then(result => {
                if (!result) {
                    done(new UnAuthenticatedError());
                } else {
                    done();
                }
            })
            .catch(done);
    });

    next();
};

export default fastifyPlugin(apiKeyAuthenticationPlugin);
