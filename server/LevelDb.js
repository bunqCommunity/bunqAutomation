const testEnvironment = process.env.NODE_ENV === "test";

class LevelDb {
    constructor(location) {
        if (testEnvironment) {
            this.levelDb = jest.mock("level");
        } else {
            const level = require("level");
            this.levelDb = level(`storage/${location}`);
        }
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
