import * as fs from "fs";
import chalk from "chalk";
const fastify = require("fastify");

import * as Errors from "./Errors";
import Routes from "./Routes";
import Plugins from "./Plugins";
import { API_KEY_HEADER } from "./Security/Authentication";
import InitPipeline from "./Automation/Init";

const DEVELOPMENT = process.env.NODE_ENV === "development";
const PORT = process.env.SERVER_PORT || process.env.PORT || 8080;
const SSL_ENABLED = process.env.SSL_ENABLED === "true";

const fastifyOptions = {
    logger: {
        redact: [`req.headers["${API_KEY_HEADER}"]`],
        level: DEVELOPMENT ? "trace" : "error",
        base: null,
        prettyPrint: DEVELOPMENT
    }
};

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
    const isApi = request.req.originalUrl.indexOf("/api") === 0;
    const errorOutput = isApi ? { error: error.message } : error.message;

    if (error instanceof Errors.DomainError) {
        request.log.warn(error.message);
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
        request.log.error(error);
        reply.code(500).send(errorOutput);
    }
});

app.listen(PORT, "0.0.0.0", (err, address) => {
    if (err) {
        app.log.error(err);
        throw err;
    }

    const httpString = SSL_ENABLED ? "https" : "http";
    const portString = PORT == 80 || PORT === 443 ? "" : `:${PORT}`;
    app.log.info(
        `Process ${process.pid} Running at port ${chalk.green(PORT)} - ${chalk.yellow(
            `${httpString}://${process.env.SERVER_HOSTNAME}${portString}`
        )}`
    );

    // Server is ready and the routes have been registered
    app.ready(err => {
        if (err) throw err;

        // Setup swagger API docs
        app.swagger();

        // register our custom things in bunqAutomation
        InitPipeline(app.bunqAutomation.pipeline)
            .then(() => {})
            .catch(error => {
                console.error(error);
            });
    });
});
