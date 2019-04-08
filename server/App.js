import * as fs from "fs";
import chalk from "chalk";
const fastify = require("fastify");

import * as Errors from "./Errors";
import { API_KEY_HEADER } from "./Security/Authentication";

import FastifyRoutes from "./FastifyRoutes";
import FastifyPlugins from "./FastifyPlugins";
import InitPipeline from "./Automation/Init";

const DEVELOPMENT = process.env.NODE_ENV === "development";
const SSL_ENABLED = process.env.SSL_ENABLED === "true";
const SSL_PORT = SSL_ENABLED ? process.env.SSL_SERVER_PORT : false;
// prefered port order SSL > Regular > Fallback
const PORT = SSL_PORT || process.env.SERVER_PORT || process.env.PORT || 8080;

const fastifyOptions = {
    logger: {
        redact: [`req.headers["${API_KEY_HEADER}"]`],
        level: process.env.LOG_LEVEL || "error",
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
FastifyPlugins(app);

// register the routes
FastifyRoutes(app);

// Overwrite all error handlers at the top level after ready event
app.setErrorHandler((error, request, reply) => {
    const isApi = request.req.originalUrl.indexOf("/api") === 0;
    let errorOutput = isApi ? { error: error.message } : error.message;
    if (isApi) {
        reply.header("Content-Type", "application/json");
    } else {
        reply.header("Content-Type", "text/html");
    }

    if (error.response) {
        console.log(error.response);
        console.log(error.response.config);
        console.log(error.response.data);
    }

    if (error instanceof Errors.DomainError) {
        request.log.warn(error.message);
        if (error instanceof Errors.ResourceNotFoundError) {
            if (isApi) {
                reply.code(404).send(errorOutput);
            } else {
                reply.code(404).sendFile("index.html");
            }
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

app.setNotFoundHandler((request, reply) => {
    const isApi = request.req.originalUrl.indexOf("/api") === 0;
    if (isApi) {
        reply.code(404).send({ error: "Page not found" });
    } else {
        reply.code(404).sendFile("index.html");
    }
});

app.listen(PORT, "0.0.0.0", (err, address) => {
    if (err) {
        app.log.error(err);
        throw err;
    }

    const httpString = SSL_ENABLED ? "https" : "http";
    const portString = PORT == 80 || PORT === 443 ? "" : `:${PORT}`;
    app.log.warn(
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
