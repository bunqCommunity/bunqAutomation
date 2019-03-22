const fs = require("fs");
const path = require("path");

const baseProjectPath = `${__dirname}${path.sep}..${path.sep}`;

try {
    const exists = fs.existsSync(`${baseProjectPath}.env2`);

    if (!exists) {
        fs.copyFileSync(`${baseProjectPath}.env.example`, `${baseProjectPath}.env2`);
        console.log("Copied .env.example to .env");
    }
} catch (error) {
    console.error(error);
}
