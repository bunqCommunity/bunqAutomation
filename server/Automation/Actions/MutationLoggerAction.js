import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import ToJSONHandler from "../ToJSONHandler";

export const mutationLoggerActionId = "MUTATION_LOGGER";
export const mutationLoggerActionDescription ="Logs to the console when triggered";

class MutationLoggerAction {
    constructor() {
        this.id = mutationLoggerActionId;
        this.description = mutationLoggerActionDescription;
        this.disabled = true;

        this.type = "MUTATION";
        this.filters = [];
        this.outputs = [consoleMessageOutputId];
    }

    toJSON = () => ToJSONHandler(this);
}

export default MutationLoggerAction;
