import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import { instantScheduleId } from "../Schedules/InstantSchedule";

export const balanceWarningActionId = "BALANCE_WARNING";
export const balanceWarningActionDescription =
    "Warns if all or a subset of the user's monetary accounts reaches a limit";

class BalanceWarningAction {
    constructor() {
        this.id = balanceWarningActionId;
        this.description = balanceWarningActionDescription;

        // what kind of event/action should trigger this
        this.type = "MUTATION";
        // TODO add account filter, for now we use the total account balance
        this.filters = [];
        // the output is the console message output handler
        this.outputs = [consoleMessageOutputId];
        // log it instantly
        this.schedules = [instantScheduleId];
    }
}

export default BalanceWarningAction;
