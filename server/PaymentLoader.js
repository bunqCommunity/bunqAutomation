class PaymentLoader {
    constructor(bunqAutomation) {
        this.logger = bunqAutomation.logger;
        this.bunqAutomation = bunqAutomation;

        this.paymentData = {};
    }

    async storePaymentData(keyIdentifier) {
        const storageKey = `PAYMENT_DATA:${keyIdentifier}`;

        this.bunqAutomation.settings.set(storageKey, this.paymentData);
    }
    async loadPaymentData(keyIdentifier) {
        const storageKey = `PAYMENT_DATA:${keyIdentifier}`;

        this.bunqAutomation.settings.get(storageKey);
    }

    async loadMonetaryAccounts(
        keyIdentifier,
        monetaryAccountIds = false,
        options = { cacheOnly: false, loadNewer: false }
    ) {
        if (typeof options.cacheOnly === "undefined") options.cacheOnly = false;
        if (typeof options.loadNewer === "undefined") options.loadNewer = false;
        if (typeof options.maximumCount === "undefined") options.maximumCount = 1000000;

        if (!this.paymentData[keyIdentifier]) this.paymentData[keyIdentifier] = {};

        // don't update, return current data
        if (options.cacheOnly) return this.paymentData[keyIdentifier];

        // get the required ids
        if (!monetaryAccountIds) {
            const monetaryAccounts = await this.getMonetaryAccounts(keyIdentifier);

            monetaryAccountIds = monetaryAccounts
                .filter(monetaryAccount => {
                    return monetaryAccount.status === "ACTIVE";
                })
                .map(monetaryAccount => monetaryAccount.id);
        } else if (!Array.isArray(monetaryAccountIds)) {
            throw new Error("MonetaryAccountIds not an array or false");
        }

        // start a fetch queue for each monetary account
        await Promise.all(
            monetaryAccountIds.map(async monetaryAccountId => {
                let apiOptions = {
                    maximumCount: options.maximumCount
                };
                if (!this.paymentData[keyIdentifier][monetaryAccountId]) {
                    this.paymentData[keyIdentifier][monetaryAccountId] = {
                        lastUpdated: null,
                        data: {}
                    };
                } else if (options.loadNewer) {
                    const newestId = Object.keys(this.paymentData[keyIdentifier][monetaryAccountId]).data[0];

                    if (newestId) apiOptions.newer_id = newestId;
                }

                await this.loadMonetaryAccount(keyIdentifier, monetaryAccountId, apiOptions);
            })
        );

        return this.paymentData[keyIdentifier];
    }

    async loadMonetaryAccount(
        keyIdentifier,
        monetaryAccountId,
        options = { newer_id: false, cacheOnly: false, loadNewer: false }
    ) {
        if (typeof options.cacheOnly === "undefined") options.cacheOnly = false;
        if (typeof options.loadNewer === "undefined") options.loadNewer = false;
        if (typeof options.maximumCount === "undefined") options.maximumCount = 1000000;

        if (!this.paymentData[keyIdentifier]) this.paymentData[keyIdentifier] = {};

        let initialCountValue = options.maximumCount >= 200 ? 200 : options.maximumCount;
        let paymentCounter = 0;

        const apiOptions = {
            count: options.count || initialCountValue
        };
        if (options.newer_id) {
            apiOptions.newer_id = options.newer_id;
        } else if (options.older_id) {
            apiOptions.older_id = options.older_id;
        } else if (options.loadNewer && this.paymentData[keyIdentifier][monetaryAccountId]) {
            // get newest id from existing list
            const newestId = Object.keys(this.paymentData[keyIdentifier][monetaryAccountId].data)[0];

            if (newestId) apiOptions.newer_id = newestId;
        }

        const user = await this.bunqAutomation.getUser(keyIdentifier, false);
        const bunqJSClient = this.bunqAutomation.bunqClientWrapper.getBunqJSClient(keyIdentifier);

        let paymentList = [];

        let isDone = false;
        while (isDone === false) {
            // get new payments for this round and add to the list
            const newPayments = await bunqJSClient.api.payment.list(user.id, monetaryAccountId, apiOptions);
            paymentList = paymentList.concat(newPayments);

            // increase payment counter
            paymentCounter += newPayments.length;

            if (newPayments.length === apiOptions.count && paymentList[0]) {
                // get oldest id
                apiOptions.older_id = paymentList[paymentList.length - 1].Payment.id;

                // check if max count is reached
                if (paymentCounter >= options.maximumCount) isDone = true;
            } else {
                isDone = true;
            }
        }

        // turn array into an object
        const newPayments = {};
        paymentList.forEach(payment => {
            const paymentInfo = payment.Payment;
            newPayments[paymentInfo.id] = paymentInfo;
        });

        // sort the payment list
        const sortedPaymentList = {};
        Object.keys(newPayments)
            .sort((a, b) => {
                return a > b ? -1 : 1;
            })
            .forEach(paymentId => {
                sortedPaymentList[paymentId] = newPayments[paymentId];
            });

        // set payment list for the monetary account id
        this.paymentData[keyIdentifier][monetaryAccountId] = { data: sortedPaymentList, lastUpdated: new Date() };

        return sortedPaymentList;
    }

    async getMonetaryAccounts(keyIdentifier) {
        return this.bunqAutomation.getMonetaryAccounts(keyIdentifier);
    }
}

export default PaymentLoader;
