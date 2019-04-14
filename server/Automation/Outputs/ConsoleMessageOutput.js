import ToJSONHandler from "../ToJSONHandler";

import { instantScheduleId } from "../Schedules/InstantSchedule";

export const consoleMessageOutputId = "CONSOLE_MESSAGE";
export const consoleMessageOutputDescription = "Outputs a message to the console";

class ConsoleMessageOutput {
    constructor(store) {
        this.store = store;

        this.id = consoleMessageOutputId;
        this.description = consoleMessageOutputDescription;

        // log it instantly
        this.schedule = instantScheduleId;
    }

    toJSON = () => ToJSONHandler(this);

    output(message) {
        console.log(message);
    }
}

export default ConsoleMessageOutput;
