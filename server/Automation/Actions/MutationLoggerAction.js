import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";

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
}

export default MutationLoggerAction;
