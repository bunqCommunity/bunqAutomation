const fs = require("fs");
const path = require("path");
const webPush = require("web-push");

const baseProjectPath = `${__dirname}${path.sep}..${path.sep}`;
const baseStorageDir = `${baseProjectPath}storage${path.sep}`;

const targetVapidPrivateKeyFile = path.normalize(`${baseStorageDir}vapid-keys.json`);
const targetVapidPublicKeyFile = path.normalize(
    `${baseProjectPath}src${path.sep}Config${path.sep}vapid-public-key.json`
);

const generateWebPushKeys = function() {
    const vapidKeys = webPush.generateVAPIDKeys();

    fs.writeFileSync(targetVapidPrivateKeyFile, JSON.stringify(vapidKeys));
    fs.writeFileSync(targetVapidPublicKeyFile, JSON.stringify(vapidKeys.publicKey));

    console.log(`Created VAPID keys for push notifications, make sure to rebuild the application`);
    console.log(`Private key: ${targetVapidPrivateKeyFile}`);
    console.log(`Public key: ${targetVapidPublicKeyFile}`);
};

try {
    const envFilePath = `${baseProjectPath}.env`;
    const envExists = fs.existsSync(envFilePath);
    if (!envExists) {
        fs.copyFileSync(`${baseProjectPath}.env.example`, envFilePath);
        console.log(` -> Copied .env.example to ${envFilePath}`);
    }

    // ensure filestore directory exists
    const fileStorePath = `${baseProjectPath}storage${path.sep}filestore`;
    const fileStorageDirExists = fs.existsSync(fileStorePath);
    if (!fileStorageDirExists) {
        fs.mkdirSync(fileStorePath);
        console.log(` -> Created ${fileStorePath}`);
    }

    // ensure VAPID keypair exists
    if (!fs.existsSync(targetVapidPrivateKeyFile) || !fs.existsSync(targetVapidPublicKeyFile)) {
        generateWebPushKeys();
    }
} catch (error) {
    console.error(error);
}
