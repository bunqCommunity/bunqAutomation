import Action from "./Action";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { monetaryAccountFilterId } from "../Filters/MonetaryAccountFilter";

export const splitIncomingFundsActionId = "SPLIT_INCOMING_FUNDS";
export const splitIncomingFundsActionTitle = "Split incoming funds";
export const splitIncomingFundsActionDescription = "Automatically split funds like your salary across accounts";

class SplitIncomingFundsAction extends Action {
    constructor(store) {
        super(store);
        this.store = store;

        this.id = splitIncomingFundsActionId;
        this.title = splitIncomingFundsActionTitle;
        this.description = splitIncomingFundsActionDescription;

        this.options = {};

        this.type = "MUTATION";
        this.filters = [monetaryAccountFilterId];
        this.outputs = [consoleMessageOutputId];
    }

    check() {}
}

export default SplitIncomingFundsAction;
