import { UnAuthenticatedError } from "../../Errors";
const fastifyPlugin = require("fastify-plugin");

/**
 * White list IP addresses
 */
const ipAuthenticationPlugin = (fastify, options, next) => {
    fastify.decorate("ipAuthentication", (request, reply, done) => {
        fastify.authentication
            .validateIp(request.ip)
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

export default fastifyPlugin(ipAuthenticationPlugin);
