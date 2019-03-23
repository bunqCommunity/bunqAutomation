const fastifyPlugin = require("fastify-plugin");
import LevelDb from "../LevelDb";

const levelDbPlugin = (fastify, options, next) => {
    fastify.decorate("levelDb", new LevelDb("db"));
    next();
};

export default fastifyPlugin(levelDbPlugin);
