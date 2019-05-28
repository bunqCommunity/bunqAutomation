import Output from "./Output";

import { instantScheduleId } from "../Schedules/InstantSchedule";

export const consoleMessageOutputId = "CONSOLE_MESSAGE";
export const consoleMessageOutputTitle = "Monetary account(s)";
export const consoleMessageOutputDescription = "Outputs a message to the console";

class ConsoleMessageOutput extends Output {
    constructor(store) {
        super(store);

        this.id = consoleMessageOutputId;
        this.title = consoleMessageOutputTitle;
        this.description = consoleMessageOutputDescription;

        // log it instantly
        this.schedule = instantScheduleId;
    }

    output(message) {
        console.log(message);
    }
}

export default ConsoleMessageOutput;
