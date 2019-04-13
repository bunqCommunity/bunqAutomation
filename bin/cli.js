require("dotenv").config();
const yargs = require("yargs");

const Authentication = require(__dirname + "/../build-server/Security/Authentication").default;
const authentication = new Authentication(console);

const argv = yargs
    .help("help")

    .command("create-key", "Creates a new API key").argv;

const run = async () => {
    const command = argv._[0];

    switch (command) {
        case "create-key": {
            const apiKey = await authentication.createApiKey("PERMANENT");
            console.log(apiKey);
            break;
        }
        default: {
            console.log("Unknown command given");
        }
    }
};

run()
    .then(() => {})
    .catch(console.error)
    .finally(() => process.exit());
