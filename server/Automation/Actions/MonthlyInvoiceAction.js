import ToJSONHandler from "../ToJSONHandler";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";

export const monthlyInvoiceActionId = "MONTHLY_INVOICE";
export const monthlyInvoiceActionTitle = "Monthly invoice";
export const monthlyInvoiceActionDescription = "Email the monthly invoice to specific email accounts";

class MonthlyInvoiceAction {
    constructor(store) {
        this.store = store;

        this.id = monthlyInvoiceActionId;
        this.title = monthlyInvoiceActionTitle;
        this.description = monthlyInvoiceActionDescription;

        this.options = {};

        // TODO implement a timer-based trigger
        this.type = "TIMER";
        this.filters = [];

        // TODO add a request output
        this.outputs = [consoleMessageOutputId];
    }

    toJSON = () => ToJSONHandler(this);

    check() {}
}

export default MonthlyInvoiceAction;
