import StorageInterface from "@bunq-community/bunq-js-client/dist/Interfaces/StorageInterface";

import Action from "./Action";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { monetaryAccountFilterId } from "../Filters/MonetaryAccountFilter";

export const automaticRequestActionId = "AUTOMATIC_REQUEST";
export const automaticRequestActionTitle = "Automatic requests";
export const automaticRequestActionDescription = "Send one or more requests in response to specific events";

class AutomaticRequestAction extends Action {
    constructor(store: StorageInterface) {
        super(store);

        this.id = automaticRequestActionId;
        this.title = automaticRequestActionTitle;
        this.description = automaticRequestActionDescription;

        this.options = {};

        this.type = "MUTATION";
        this.filters = [monetaryAccountFilterId];
        this.outputs = [consoleMessageOutputId];
    }

    check() {}
}

export default AutomaticRequestAction;
