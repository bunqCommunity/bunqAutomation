import LoggerInterface from "@bunq-community/bunq-js-client/dist/Interfaces/LoggerInterface";

import LevelDb from "./StorageHandlers/LevelDb";

import Encryption from "./Security/Encryption";

export const MONETARY_ACCOUNT_COLORS = "MONETARY_ACCOUNT_COLORS";

class Settings {
    public logger: LoggerInterface;
    public encryption: Encryption;
    public settingsStore: LevelDb;

    public encryptionKey: null | string;

    constructor(logger) {
        this.logger = logger;
        this.encryption = new Encryption();
        this.settingsStore = new LevelDb("bunq-automation-settings");

        this.encryptionKey = null;
    }

    async startup() {}

    async getValue(key, encrypt = false) {
        const storedSettingValue = await this.settingsStore.get(key);
        if (!storedSettingValue) return null;

        if (encrypt) {
            const settingIv = await this.settingsStore.get(`${key}_IV`);

            try {
                return this.encryption.decrypt(storedSettingValue, this.encryptionKey, settingIv);
            } catch (error) {
                return null;
            }
        }

        return storedSettingValue;
    }
    async setValue(key, value, encrypt = false) {
        if (encrypt) {
            const { iv, encryptedString } = await this.encryption.encrypt(value, this.encryptionKey);

            await this.settingsStore.set(`${key}_IV`, iv);
            return this.settingsStore.set(key, encryptedString);
        }

        return this.settingsStore.set(key, value);
    }

    /**
     * Set colors for monetary account colors
     * @param monetaryAccountColors
     * @param overwrite - if true, reset existing values
     * @returns {Promise<void>}
     */
    async getMonetaryAccountColors() {
        let monetaryAccountColors = await this.settingsStore.get(MONETARY_ACCOUNT_COLORS);
        if (!monetaryAccountColors) monetaryAccountColors = {};

        return monetaryAccountColors;
    }
    async setMonetaryAccountColors(monetaryAccountColors, overwrite = false) {
        let storedColors = await this.settingsStore.get(MONETARY_ACCOUNT_COLORS);
        if (!storedColors || overwrite === true) storedColors = {};

        Object.keys(monetaryAccountColors).forEach(accountId => {
            storedColors[accountId] = monetaryAccountColors[accountId];
        });

        await this.settingsStore.set(MONETARY_ACCOUNT_COLORS, storedColors);
    }

    async reset() {
        await Promise.all([this.settingsStore.remove(MONETARY_ACCOUNT_COLORS)]);
    }
}

export default Settings;
