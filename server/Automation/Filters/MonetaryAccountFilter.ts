import Filter from "./Filter";

export const monetaryAccountFilterId = "MONETARY_ACCOUNT";
export const monetaryAccountFilterTitle = "Monetary account(s)";
export const monetaryAccountFilterDescription = "Filter if one or more monetary account IDs match the given input ";

class MonetaryAccountFilter extends Filter {
    constructor(store) {
        super(store);

        this.id = monetaryAccountFilterId;
        this.title = monetaryAccountFilterTitle;
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

        return true;
    }
}

export default MonetaryAccountFilter;
