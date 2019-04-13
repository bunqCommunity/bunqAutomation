export const monetaryAccountFilterId = "MONETARY_ACCOUNT";
export const monetaryAccountFilterDescription = "Filter if one or more monetary account IDs match the given input ";

class MonetaryAccountFilter {
    constructor() {
        this.id = monetaryAccountFilterId;
        this.description = monetaryAccountFilterDescription;

        this.disabled = true;
    }
}

export default MonetaryAccountFilter;
