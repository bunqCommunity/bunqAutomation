class PaymentLoader {
    constructor(bunqAutomation) {
        this.logger = bunqAutomation.logger;
        this.bunqAutomation = bunqAutomation;
    }

    async load(keyIdentifier, options = {}, monetaryAccountIds = false) {
        let monetaryAccounts = await this.getMonetaryAccounts(keyIdentifier);

        if (Array.isArray(monetaryAccountIds) && monetaryAccountIds.length > 0) {
            monetaryAccounts = monetaryAccounts.filter(monetaryAccount => {
                return monetaryAccountIds.includes(monetaryAccount.id);
            });
        }

        const paymentData = {};
        await Promise.all(
            monetaryAccounts.map(async monetaryAccount => {
                const payments = await this.loadPayments(keyIdentifier, monetaryAccount.id);

                paymentData[monetaryAccount.id] = payments;
            })
        );

        return paymentData;
    }

    async loadPayments(keyIdentifier, monetaryAccountId, options = {}) {
        const apiOptions = {
            count: options.count || 200
        };
        if (options.newer_id) {
            apiOptions.newer_id = options.newer_id;
        } else if (options.older_id) {
            apiOptions.older_id = options.older_id;
        }

        const user = await this.bunqAutomation.getUser(keyIdentifier, false);
        const bunqJSClient = this.bunqAutomation.bunqClientWrapper.getBunqJSClient(keyIdentifier);

        let paymentList = [];

        let isDone = false;
        while (isDone === false) {
            // const newPayments = await bunqJSClient.api.payment.list(user.id, monetaryAccountId, apiOptions);
            //
            // paymentList = paymentList.concat(newPayments);
        }

        return paymentList;
    }

    async getMonetaryAccounts(keyIdentifier) {
        return this.bunqAutomation.getMonetaryAccounts(keyIdentifier);
    }
}

export default PaymentLoader;
