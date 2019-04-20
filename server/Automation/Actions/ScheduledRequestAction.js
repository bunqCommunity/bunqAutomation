import ToJSONHandler from "../ToJSONHandler";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";

export const scheduledRequestActionId = "SCHEDULED_REQUEST";
export const scheduledRequestActionTitle = "Schedule requests";
export const scheduledRequestActionDescription = "Schedule requests on specific moments similar to scheduled payments";

class ScheduledRequestAction {
    constructor(store) {
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

    toJSON = () => ToJSONHandler(this);

    check() {}
}

export default ScheduledRequestAction;
