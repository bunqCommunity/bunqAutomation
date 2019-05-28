const fastifyPlugin = require("fastify-plugin");
import { UnAuthenticatedError } from "../../Errors";
import { BUNQ_API_KEY_HEADER } from "../../Security/Authentication";

/**
 * The standard generic API key authentication through a header
 */
const apiKeyAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("apiKeyAuthentication", async (request, reply) => {
        const headers = request.headers;
        const query = request.query;

        // get either value but prefer header
        const apiKey = headers[BUNQ_API_KEY_HEADER] || query.api_key;

        const result = await fastify.bunqAutomation.authentication.validateApiKey(apiKey);

        if (!result) {
            throw new UnAuthenticatedError();
        }
    });

    next();
};

export default fastifyPlugin(apiKeyAuthenticationPlugin);
