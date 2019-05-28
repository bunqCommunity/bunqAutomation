const level = require("level");

class LevelDb {
    public levelDb: any;

    constructor(location, overwriteLocation = false) {
        const storageLocation = overwriteLocation ? location : `storage/level/${location}`;

        this.levelDb = level(storageLocation);
    }

    async get(key, silent = true) {
        let value = null;
        try {
            value = await this.levelDb.get(key);

            value = JSON.parse(value);
        } catch (error) {
            if (!silent) throw error;
        }

        return value;
    }

    async set(key, value, silent = true) {
        try {
            const stringifiedValue = JSON.stringify(value);

            await this.levelDb.put(key, stringifiedValue);
        } catch (error) {
            if (!silent) throw error;
        }
    }

    async remove(key, silent = true) {
        try {
            return this.levelDb.del(key);
        } catch (error) {
            if (!silent) throw error;
        }
    }

    stream(options = {}) {
        return this.levelDb.createReadStream(options);
    }

    async streamSync(options = {}, silent = true) {
        return new Promise((resolve, reject) => {
            const dataList = {};

            const readStream = this.stream(options);

            readStream.on("data", data => {
                dataList[data.key] = JSON.parse(data.value);
            });

            readStream.on("error", error => {
                if (silent) {
                    return resolve(dataList);
                }

                readStream.close();
                reject(error);
            });

            readStream.on("close", () => resolve(dataList));
        });
    }
}

export default LevelDb;
