import Action from "./Action";

import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { monetaryAccountFilterId } from "../Filters/MonetaryAccountFilter";

export const autoSavePercentageActionId = "AUTO_SAVE_PERCENTAGE";
export const autoSavePercentageActionTitle = "Auto save percentage";
export const autoSavePercentageActionDescription =
    "Save a percentage of each payment with optional minimum and maximum values";

class AutoSavePercentageAction extends Action {
    constructor(store) {
        super(store);

        this.id = autoSavePercentageActionId;
        this.title = autoSavePercentageActionTitle;
        this.description = autoSavePercentageActionDescription;

        this.options = {};

        this.type = "MUTATION";
        this.filters = [monetaryAccountFilterId];
        this.outputs = [consoleMessageOutputId];
    }

    check() {}
}

export default AutoSavePercentageAction;
