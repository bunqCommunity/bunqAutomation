import ConsoleMessageOutput from "../Outputs/ConsoleMessageOutput";
import InstantSchedule from "../Schedules/InstantSchedule";

class EventLoggerAction {
    constructor() {
        this.id = "event-logger";
        this.description = "Logs to the console when triggered";

        // what kind of event/action should trigger this
        this.type = "EVENT";
        // no filters possible for this specific action
        this.filters = [];
        // the output is the console message output handler
        this.outputs = [new ConsoleMessageOutput().id];
        // log it instantly
        this.schedules = [new InstantSchedule().id];
    }
}

export default EventLoggerAction;
