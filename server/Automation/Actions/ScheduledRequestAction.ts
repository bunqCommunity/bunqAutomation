import Action from "./Action";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";

export const scheduledRequestActionId = "SCHEDULED_REQUEST";
export const scheduledRequestActionTitle = "Schedule requests";
export const scheduledRequestActionDescription = "Schedule requests on specific moments similar to scheduled payments";

class ScheduledRequestAction extends Action {
    constructor(store) {
        super(store);
        this.store = store;

        this.id = scheduledRequestActionId;
        this.title = scheduledRequestActionTitle;
        this.description = scheduledRequestActionDescription;

        this.options = {};

        // TODO implement a timer-based trigger
        this.type = "TIMER";
        this.filters = [];

        // TODO add a request output
        this.outputs = [consoleMessageOutputId];
    }

    check() {}
}

export default ScheduledRequestAction;
