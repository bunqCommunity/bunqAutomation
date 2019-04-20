import ToJSONHandler from "../ToJSONHandler";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { monetaryAccountFilterId } from "../Filters/MonetaryAccountFilter";

export const splitIncomingFundsActionId = "SPLIT_INCOMING_FUNDS";
export const splitIncomingFundsActionTitle = "Split incoming funds";
export const splitIncomingFundsActionDescription = "Automatically split funds like your salary across accounts";

class SplitIncomingFundsAction {
    constructor(store) {
        this.store = store;

        this.id = splitIncomingFundsActionId;
        this.title = splitIncomingFundsActionTitle;
        this.description = splitIncomingFundsActionDescription;

        this.options = {};

        this.type = "MUTATION";
        this.filters = [monetaryAccountFilterId];
        this.outputs = [consoleMessageOutputId];
    }

    toJSON = () => ToJSONHandler(this);

    check() {}
}

export default SplitIncomingFundsAction;
