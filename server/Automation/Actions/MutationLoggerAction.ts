import Action from "./Action";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";

export const mutationLoggerActionId = "MUTATION_LOGGER";
export const mutationLoggerActionTitle = "Mutation logger";
export const mutationLoggerActionDescription = "Logs to the console when triggered";

class MutationLoggerAction extends Action {
    constructor(store) {
        super(store);

        this.id = mutationLoggerActionId;
        this.title = mutationLoggerActionTitle;
        this.description = mutationLoggerActionDescription;
        // this.disabled = true;

        this.type = "MUTATION";
        this.filters = [];
        this.outputs = [consoleMessageOutputId];
    }

    check() {}
}

export default MutationLoggerAction;
