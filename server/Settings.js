import LevelDb from "./StorageHandlers/LevelDb";

export const MONETARY_ACCOUNT_COLORS = "MONETARY_ACCOUNT_COLORS";

class Settings {
    constructor(logger) {
        this.logger = logger;
        this.settingsStore = new LevelDb("bunq-automation-settings");
    }

    async startup() {}

    async getMonetaryAccountColors() {
        let monetaryAccountColors = await this.settingsStore.get(MONETARY_ACCOUNT_COLORS);
        if (!monetaryAccountColors) monetaryAccountColors = {};

        return monetaryAccountColors;
    }

    /**
     * Set colors for monetary account ids
     * @param monetaryAccountColors
     * @param overwrite - if true, reset existing values
     * @returns {Promise<void>}
     */
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
