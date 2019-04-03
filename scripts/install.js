const fs = require("fs");
const path = require("path");

const baseProjectPath = `${__dirname}${path.sep}..${path.sep}`;

try {
    const envFilePath = `${baseProjectPath}.env`;
    const envExists = fs.existsSync(envFilePath);
    if (!envExists) {
        fs.copyFileSync(`${baseProjectPath}.env.example`, envFilePath);
        console.log(` -> Copied .env.example to ${envFilePath}`);
    }

    const fileStorePath = `${baseProjectPath}storage${path.sep}filestore`;
    const fileStorageDirExists = fs.existsSync(fileStorePath);
    if (!fileStorageDirExists) {
        fs.mkdirSync(fileStorePath);
        console.log(` -> Created ${fileStorePath}`);
    }
} catch (error) {
    console.error(error);
}
