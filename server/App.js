require("dotenv").config();
import * as fs from "fs";
import chalk from "chalk";
const fastify = require("fastify");

import Routes from "./Routes";
import Plugins from "./Plugins";

const HTTP_PORT = process.env.HTTP_PORT;
const SSL_PORT = process.env.SSL_PORT;
const SSL_ENABLED = process.env.SSL_ENABLED === "true";
const SERVER_PORT = SSL_ENABLED ? SSL_PORT : HTTP_PORT;

const fastifyOptions = {};

if (SSL_ENABLED) {
    fastifyOptions.https = {
        key: fs.readFileSync(process.env.SSL_KEY_FILE),
        cert: fs.readFileSync(process.env.SSL_CRT_FILE)
    };
}

const app = fastify(fastifyOptions);

// register the fastify plugins
Plugins(app);

// register the routes
Routes(app);

app.setErrorHandler((error, request, reply) => {
    request.log.warn(error);
    const statusCode = error.statusCode >= 400 ? error.statusCode : 500;

    reply.code(statusCode).send("500 error");
});

app.listen(SERVER_PORT, "0.0.0.0", (err, address) => {
    if (err) {
        console.error(err);
        throw err;
    }
    const httpString = SSL_ENABLED ? "https" : "http";
    const portString = SERVER_PORT == 80 || SERVER_PORT === 443 ? "" : `:${SERVER_PORT}`;
    console.log(
        `Process ${process.pid} Running at port ${chalk.green(SERVER_PORT)} - ${chalk.yellow(
            `${httpString}://${process.env.SERVER_HOSTNAME}${portString}`
        )}`
    );

    // Server is ready and the routes have been registered
    app.ready(err => {
        if (err) throw err;

        // Setup swagger API docs
        app.swagger();
    });
});
