const fastifyPlugin = require("fastify-plugin");

class AuthenticationPlugin {
    constructor(levelDb) {
        this.levelDb = levelDb;
    }

    reset() {
        // reset bunqAutomation api keys and other info
    }
}

const authenticationPlugin = (fastify, options, next) => {
    const authentication = new AuthenticationPlugin(fastify.levelDb);

    fastify.decorate("authentication", authentication);

    next();
};

export default fastifyPlugin(authenticationPlugin);
