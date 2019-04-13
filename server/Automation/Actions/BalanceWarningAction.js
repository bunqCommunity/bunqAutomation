import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";

export const balanceWarningActionId = "BALANCE_WARNING";
export const balanceWarningActionDescription =
    "Warns if all or a subset of the user's monetary accounts reaches a limit";

class BalanceWarningAction {
    constructor() {
        this.id = balanceWarningActionId;
        this.description = balanceWarningActionDescription;

        this.options = {
            allAccounts: {
                type: "BOOLEAN",
                descsription: "Check total balance or filter for a specific few",
                defaultValue: true
            }
        };

        this.type = "MUTATION";
        // TODO add account filter, for now we use the total account balance
        this.filters = [];
        this.outputs = [consoleMessageOutputId];
    }
}

export default BalanceWarningAction;
