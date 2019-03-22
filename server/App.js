require("dotenv").config();
import * as fs from "fs";
import chalk from "chalk";
const fastify = require("fastify");

import * as Errors from "./Errors";
import Routes from "./Routes";
import Plugins from "./Plugins";

const PORT = process.env.PORT || process.env.HTTP_PORT || 8080;
const SSL_ENABLED = process.env.SSL_ENABLED === "true";

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

// Overwrite all error handlers at the top level after ready event
app.setErrorHandler((error, request, reply) => {
    request.log.warn(error);

    const isApi = request.req.originalUrl.indexOf("/api") === 0;
    const errorOutput = isApi ? { error: error.message } : error.message;

    if (error instanceof Errors.DomainError) {
        if (error instanceof Errors.ResourceNotFoundError) {
            reply.code(404).send(errorOutput);
        } else if (error instanceof Errors.BadRequestError) {
            reply.code(400).send(errorOutput);
        } else if (error instanceof Errors.UnAuthenticatedError) {
            reply.code(403).send(errorOutput);
        } else {
            reply.code(500).send(errorOutput);
        }
    } else {
        reply.code(500).send(errorOutput);
    }
});

app.listen(PORT, "0.0.0.0", (err, address) => {
    if (err) {
        console.error(err);
        throw err;
    }
    const httpString = SSL_ENABLED ? "https" : "http";
    const portString = PORT == 80 || PORT === 443 ? "" : `:${PORT}`;
    console.log(
        `Process ${process.pid} Running at port ${chalk.green(PORT)} - ${chalk.yellow(
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
