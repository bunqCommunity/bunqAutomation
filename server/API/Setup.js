import RateLimitPlugin from "../Plugins/Authentication/RateLimitPlugin";
import { BadRequestError } from "../Errors";
import { STATUS_FIRST_INSTALL, STATUS_PASSWORD_READY, STATUS_UNINITIALIZED } from "../BunqAutomation";
import BunqApiErrorFormatter from "../Functions/BunqApiErrorFormatter";

const swaggerSecuritySchema = [
    {
        apiKey: []
    }
];

export default (app, opts, next) => {
    const bunqAutomation = app.bunqAutomation;
    const authentication = bunqAutomation.authentication;

    // rate limit the setup endpoints
    RateLimitPlugin(app, 5);

    /**
     * Set a new password for fresh installs or attempt to authenticate with existing
     * Will return a valid api token which can be used to authenticate for other routes
     */
    app.route({
        method: "POST",
        url: "/password",
        handler: async (request, reply) => {
            if (!request.body || !request.body.password) throw new BadRequestError();

            await bunqAutomation.setPassword(request.body.password);

            // check if password is ready and attempt to load API key if that is the case
            if (bunqAutomation.status === STATUS_PASSWORD_READY) {
                await bunqAutomation.loadStoredBunqApiKeys();
            }

            const apiKey = await authentication.createApiKey();

            reply.send({
                api_key: apiKey
            });
        },
        schema: {
            tags: ["setup"],
            summary: "Set a new password or authenticate with the existing password",
            response: {
                200: {
                    description: "Successful response",
                    type: "object",
                    properties: {
                        api_key: {
                            description: "An API key which can be used to authenticate with the bunqAutomation API",
                            type: "string"
                        }
                    }
                }
            },
            security: swaggerSecuritySchema
        }
    });

    /**
     * Add the API key and environment that will be used
     */
    app.route({
        url: "/api-key",
        method: "POST",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            const invalidStatusList = [STATUS_UNINITIALIZED, STATUS_FIRST_INSTALL];
            if (invalidStatusList.includes(bunqAutomation.status)) {
                throw new BadRequestError("bunqAutomation not ready yet, can't receive bunq API key");
            }
            if (!request.body || !request.body.api_key || !request.body.environment) {
                throw new BadRequestError();
            }
            // device name is optional
            const deviceName = request.body.device_name || "bunqAutomation";
            try {
                // attempt to register the api key
                await bunqAutomation.addBunqApiKey(request.body.api_key, request.body.environment, deviceName);

                reply.send({ status: true });
            } catch (error) {
                reply.status(400).send({ error: BunqApiErrorFormatter(error) });
            }
        },
        schema: {
            tags: ["setup"],
            summary: "Set a bunq API key and environment to use with bunqAutomation",
            response: {
                200: {
                    description: "Successful response",
                    type: "object",
                    properties: {
                        status: {
                            type: "boolean"
                        }
                    }
                }
            },
            security: swaggerSecuritySchema
        }
    });

    /**
     * Can be used to check if an API key is still valid
     */
    app.route({
        url: "/validate-api-key",
        method: "POST",
        preHandler: app.auth([app.apiKeyAuthentication]),
        handler: async (request, reply) => {
            reply.send({ status: true });
        },
        schema: {
            tags: ["setup"],
            summary: "Endpoint to validate API keys",
            response: {
                200: {
                    description: "Successful response",
                    type: "object",
                    properties: {
                        status: {
                            type: "boolean"
                        }
                    }
                }
            },
            security: swaggerSecuritySchema
        }
    });

    ///**
    // * Reset all setup details like passwords and api key
    // */
    // app.route({
    //     url: "/reset",
    //     method: "POST",
    //     preHandler: app.auth([app.apiKeyAuthentication]),
    //     handler: async (request, reply) => {
    //         await bunqAutomation.reset();
    //
    //         reply.send("api-key");
    //     },
    //     schema: {
    //         tags: ["setup"],
    //         summary: "Reset private data such as passwords and API keys",
    //         response: {
    //             200: {
    //                 description: "Successful response",
    //                 type: "string"
    //             }
    //         },
    //         security: swaggerSecuritySchema
    //     }
    // });

    next();
};
