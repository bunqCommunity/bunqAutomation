const fastifyPlugin = require("fastify-plugin");

export const bunqUserSchema = {
    $id: "bunqUser",
    type: "object",
    properties: {
        id: {
            type: "string"
        },
        alias: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    type: {
                        type: "string"
                    },
                    value: {
                        type: "string"
                    },
                    name: {
                        type: "string"
                    }
                }
            }
        },
        avatar: {
            type: "object",
            properties: {
                image: {
                    type: "array",
                    items: {}
                }
            }
        },
        display_name: {
            type: "string"
        },
        public_nick_name: {
            type: "string"
        }
    }
};

const SchemaRegistrationPlugin = (fastify, options, next) => {
    fastify.addSchema(bunqUserSchema);

    next();
};

export default fastifyPlugin(SchemaRegistrationPlugin);
