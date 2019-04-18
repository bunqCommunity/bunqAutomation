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
        const user = await this.bunqAutomation.getUser(keyIdentifier, false);
        const bunqJSClient = this.bunqAutomation.bunqClientWrapper.getBunqJSClient(keyIdentifier);

        let paymentList = [];

        let isDone = false;
        while (isDone === false) {
            // const newPayments = await bunqJSClient.api.payment.list(user.id, monetaryAccountId, {
            //     count: 200,
            //     newer_id: 1,
            //     older_id: 1000
            // });
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
