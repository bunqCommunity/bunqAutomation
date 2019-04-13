export const monetaryAccountFilterId = "MONETARY_ACCOUNT";
export const monetaryAccountFilterDescription = "Filter if one or more monetary account IDs match the given input ";

class MonetaryAccountFilter {
    constructor() {
        this.id = monetaryAccountFilterId;
        this.description = monetaryAccountFilterDescription;
    }

    /**
     * Checks if the given inputValue(s) are included in the filterValue(s)
     * @param inputValues
     * @param filterValues
     */
    filter(inputValues, filterValues) {
        if (!Array.isArray(filterValues)) filterValues = [filterValues];
        if (!Array.isArray(inputValues)) inputValues = [inputValues];
    }
}

export default MonetaryAccountFilter;
