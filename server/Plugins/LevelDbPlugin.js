const fastifyPlugin = require("fastify-plugin");
const level = require("level");

export class LevelDbWrapper {
    constructor(levelDb) {
        this.levelDb = levelDb;
    }

    async get(key) {
        let value = null;
        try {
            value = await this.levelDb.get(key);
        } catch (error) {}
        return value;
    }

    async set(key, value) {
        try {
            return await this.levelDb.put(key, value);
        } catch (error) {}
    }

    async remove(key) {
        try {
            return this.levelDb.del(key);
        } catch (error) {}
    }
}

const levelDbPlugin = (fastify, options, next) => {
    const db = level("storage/db");


    fastify.decorate("levelDb", new LevelDbWrapper(db));
    next();
};

export default fastifyPlugin(levelDbPlugin);
