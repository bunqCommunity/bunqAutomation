const forge = require("node-forge");

const forgeCipher = forge.cipher;
const forgeUtil = forge.util;

const validateIterationCount = rounds => {
    let usedIterations = 500000;

    if (typeof rounds === "number" && rounds >= 0) {
        usedIterations = rounds;
    }

    return usedIterations;
};

export default class Encryption {
    async encrypt(data, key, iv) {
        const string = JSON.stringify(data);

        // create a random initialization vector
        iv = iv ? forgeUtil.hexToBytes(iv) : forge.random.getBytesSync(32);

        // turn hex-encoded key into bytes
        const encryptionKeyBytes = forgeUtil.hexToBytes(key);

        // create a new aes-cbc cipher with our key
        const cipher = forgeCipher.createCipher("AES-CBC", encryptionKeyBytes);

        // turn our string into a buffer
        const buffer = forgeUtil.createBuffer(string, "utf8");

        cipher.start({ iv: iv });
        cipher.update(buffer);
        cipher.finish();

        return {
            iv: forgeUtil.bytesToHex(iv),
            key: key,
            encryptedString: cipher.output.toHex()
        };
    }

    async decrypt(data, key, iv) {
        // get byte data from hex encoded strings
        const encrypedBytes = forgeUtil.hexToBytes(data);

        // create a new forge buffer using the bytes
        const encryptedBuffer = forgeUtil.createBuffer(encrypedBytes, "raw");
        const keyBytes = forgeUtil.hexToBytes(key);
        const ivBytes = forgeUtil.hexToBytes(iv);

        // create a new decipher with our key and iv
        const decipher = forgeCipher.createDecipher("AES-CBC", keyBytes);
        decipher.start({ iv: ivBytes });
        decipher.update(encryptedBuffer);

        // check the decipher results
        const result = decipher.finish();
        if (!result) {
            throw new Error("Failed to decrypt string, the encryption string might have changed");
        }
        // get the raw bytes from the forge buffer
        const outputBytes = decipher.output.getBytes();

        // turn forge bytes into a regular buffer
        const nodeBuffer = Buffer.from(outputBytes, "binary");

        // return the result as an utf8-encoded string
        const string = nodeBuffer.toString("utf8");

        return JSON.parse(string);
    }

    /**
     * @param password
     * @param iv
     * @param keySize
     * @param rounds
     */
    derivePassword(password, iv = false, keySize = 32, rounds = false) {
        // generate a random iv
        let passwordIv;
        if (iv) {
            // turn existing iv into bytes
            passwordIv = forge.util.hexToBytes(iv);
        } else {
            // generate a new random iv
            passwordIv = forge.random.getBytesSync(keySize);
        }

        const usedIterations = validateIterationCount(rounds);

        // derive a 16 bit key from the password and iv
        const derivedBytes = forge.pkcs5.pbkdf2(password, passwordIv, usedIterations, keySize);

        // turn derivedBytes into a readable string
        const encryptionKey = forge.util.bytesToHex(derivedBytes);

        // turn passwordIv into a readable string
        const encryptionIv = forge.util.bytesToHex(passwordIv);

        return {
            key: encryptionKey,
            iv: encryptionIv
        };
    }

    /**
     * Basic function just to generate a random AES key
     * @param keySize
     */
    generateRandomKey(keySize) {
        // random bytes
        const key = forge.random.getBytesSync(keySize);

        // straight to hex and return it
        return forge.util.bytesToHex(key);
    }
}
