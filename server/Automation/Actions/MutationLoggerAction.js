import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { instantScheduleId } from "../Schedules/InstantSchedule";

class MutationLoggerAction {
    constructor() {
        this.id = "mutation-logger";
        this.description = "Logs to the console when triggered";

        this.disabled = true;

        // what kind of event/action should trigger this
        this.type = "MUTATION";
        // no filters possible for this specific action
        this.filters = [];
        // the output is the console message output handler
        this.outputs = [consoleMessageOutputId];
        // log it instantly
        this.schedules = [instantScheduleId];
    }
}

export default MutationLoggerAction;
