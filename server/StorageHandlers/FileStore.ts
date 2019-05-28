const fs = require("fs");
import * as path from "path";

export const FILESTORE_BASE_PATH = path.normalize(path.join(__dirname, "..", "..", "storage", "filestore"));

class FileStore {
    constructor() {}

    get(fileName) {
        const normalizedPath = this.normalizePath(fileName);

        return fs.readFile(normalizedPath);
    }

    stream(fileName) {
        const normalizedPath = this.normalizePath(fileName);

        return fs.createReadStream(normalizedPath);
    }

    async exists(fileName) {
        const normalizedPath = this.normalizePath(fileName);

        try {
            await fs.promises.stat(normalizedPath);

            return true;
        } catch (error) {}
        return false;
    }

    async write(fileName, contents) {
        const normalizedPath = this.normalizePath(fileName);

        return fs.promises.writeFile(normalizedPath, contents);
    }

    normalizePath(fileName) {
        const normalizedPath = path.normalize(`${FILESTORE_BASE_PATH}${path.sep}${fileName}`);
        if (!normalizedPath.startsWith(FILESTORE_BASE_PATH)) {
            throw new Error("Path isn't within the fileStore's allowed path");
        }

        return normalizedPath;
    }
}

export default FileStore;
