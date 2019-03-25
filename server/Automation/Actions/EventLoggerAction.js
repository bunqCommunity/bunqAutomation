import ConsoleMessageOutput from "../Outputs/ConsoleMessageOutput";

class EventLoggerAction {
    constructor() {
        this.id = "event-logger";
        this.type = "EVENT";
        this.description = "Logs to the console when triggered";

        this.filters = [];
        this.outputs = [ConsoleMessageOutput.id];
        this.schedules = ["INSTANT"];
    }

    run() {}
}

export default EventLoggerAction;
