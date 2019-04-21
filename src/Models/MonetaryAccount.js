import { Dinero } from "../Functions/AmountFormatting";

export default class MonetaryAccount {
    // the original raw object
    _rawData = {};

    // account type of this monetary account
    _accountType = null;
    _color = null;

    // standard fields
    _id = null;
    _created = null;
    _updated = null;
    _avatar = null;
    _currency = null;
    _description = null;
    _daily_limit = null;
    _daily_spent = null;
    _overdraft_limit = null;
    _balance = null;
    _alias = null;
    _public_uuid = null;
    _status = null;
    _sub_status = null;
    _user_id = null;
    _monetary_account_profile = null;
    _notification_filters = null;
    _setting = null;

    // savings goal accounts
    _savings_goal = null;
    _savings_goal_progress = null;

    // shared accounts
    _all_co_owner = null;

    constructor(monetaryAccountObject) {
        this._rawData = monetaryAccountObject;

        // get the direct object using the extracted account tpye
        let accountInfo = monetaryAccountObject;
        if (typeof monetaryAccountObject.accountType === "undefined") {
            // get the account type
            this._accountType = this.getAccountType(monetaryAccountObject);

            // get the direct object using the extracted account tpye
            accountInfo = monetaryAccountObject[this.accountType];
        }

        // go through all keys and set the data
        Object.keys(accountInfo).forEach(key => {
            const objectKey = key[0] === "_" ? key : `_${key}`;
            const objectValue = accountInfo[key];

            switch (key) {
                case "balance":
                    // parse as number and turn amount into 'cents'
                    const balanceAmount = parseFloat(objectValue.value) * 100;

                    this._balance = Dinero({
                        amount: balanceAmount,
                        currency: objectValue.currency
                    });
                    break;
                default:
                    this[objectKey] = objectValue;
                    break;
            }
        });

        this._updated = new Date(this._updated);
        this._created = new Date(this._created);
    }

    /**
     * Returns a string with the type of this monetary account object
     * @param monetaryAccountObject
     * @returns {AccountType}
     */
    getAccountType(monetaryAccountObject) {
        const accountTypes = Object.keys(monetaryAccountObject);

        return accountTypes[0];
    }

    /**
     * Used to store this object in JSON
     * @returns {string}
     */
    toJSON() {
        return this._rawData;
    }

    /**
     * Normal getters for all properties
     * @returns {number}
     */
    get accountType() {
        return this._accountType;
    }
    get color() {
        return this._color;
    }
    get raw() {
        return this._rawData;
    }

    get id() {
        return this._id;
    }
    get created() {
        return this._created;
    }
    get updated() {
        return this._updated;
    }
    get avatar() {
        return this._avatar;
    }
    get currency() {
        return this._currency;
    }
    get description() {
        return this._description;
    }
    get daily_limit() {
        return this._daily_limit;
    }
    get daily_spent() {
        return this._daily_spent;
    }
    get overdraft_limit() {
        return this._overdraft_limit;
    }
    get balance() {
        return this._balance;
    }
    get alias() {
        return this._alias;
    }
    get public_uuid() {
        return this._public_uuid;
    }
    get status() {
        return this._status;
    }
    get sub_status() {
        return this._sub_status;
    }
    get user_id() {
        return this._user_id;
    }
    get monetary_account_profile() {
        return this._monetary_account_profile;
    }
    get notification_filters() {
        return this._notification_filters;
    }
    get setting() {
        return this._setting;
    }
    get all_co_owner() {
        return this._all_co_owner;
    }
    get savings_goal() {
        return this._savings_goal;
    }
    get savings_goal_progress() {
        return this._savings_goal_progress;
    }
}
