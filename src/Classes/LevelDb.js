const levelup = require("levelup");
const leveljs = require("level-js");

class LevelDb {
    constructor(location) {
        this.levelDb = levelup(leveljs(location));
    }

    async get(key) {
        let value = null;
        try {
            value = await this.levelDb.get(key);
        } catch (error) {}
        return JSON.parse(value);
    }

    async set(key, value) {
        try {
            return await this.levelDb.put(key, JSON.stringify(value));
        } catch (error) {}
    }

    async remove(key) {
        try {
            return this.levelDb.del(key);
        } catch (error) {}
    }
}

export default LevelDb;
