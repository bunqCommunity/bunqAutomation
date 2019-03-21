require("dotenv").config();
import chalk from "chalk";

import Routes from "./Routes";
import Plugins from "./Plugins";

const fastify = require("fastify");
const httpPort = process.env.SERVER_PORT;

const app = fastify({});

// register the fastify plugins
Plugins(app);

// register the routes
Routes(app);

app.setErrorHandler((error, request, reply) => {
    request.log.warn(error);
    const statusCode = error.statusCode >= 400 ? error.statusCode : 500;

    reply.code(statusCode).send("500 error");
});

app.listen(httpPort, "0.0.0.0", (err, address) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log(
        `Process ${process.pid} Running at ${chalk.green(httpPort)} - ${chalk.yellow(
            `http://${process.env.SERVER_HOSTNAME}:8888`
        )}`
    );

    // Server is ready and the routes have been registered
    app.ready(err => {
        if (err) throw err;

        // Setup swagger API docs
        app.swagger();
    });
});
