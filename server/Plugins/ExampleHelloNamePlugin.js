const fastifyPlugin = require("fastify-plugin");

function helloPlugin(fastify, options, next) {
    fastify.decorate("helloName", name => {
        console.log(`Hello ${name}`);
    });

    next();
}

export default fastifyPlugin(helloPlugin);
