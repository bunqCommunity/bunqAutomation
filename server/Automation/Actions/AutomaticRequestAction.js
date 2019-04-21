import ToJSONHandler from "../ToJSONHandler";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { monetaryAccountFilterId } from "../Filters/MonetaryAccountFilter";

export const automaticRequestActionId = "AUTOMATIC_REQUEST";
export const automaticRequestActionTitle = "Automatic requests";
export const automaticRequestActionDescription = "Send one or more requests in response to specific events";

class AutomaticRequestAction {
    constructor(store) {
        this.store = store;

        this.id = automaticRequestActionId;
        this.title = automaticRequestActionTitle;
        this.description = automaticRequestActionDescription;

        this.options = {};

        this.type = "MUTATION";
        this.filters = [monetaryAccountFilterId];
        this.outputs = [consoleMessageOutputId];
    }

    toJSON = () => ToJSONHandler(this);

    check() {}
}

export default AutomaticRequestAction;
