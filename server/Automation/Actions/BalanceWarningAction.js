import { consoleMessageOutputId } from "../Outputs/ConsoleMessageOutput";
import {monetaryAccountFilterId} from "../Filters/MonetaryAccountFilter";

export const balanceWarningActionId = "BALANCE_WARNING";
export const balanceWarningActionDescription =
    "Warns if all or a subset of the user's monetary accounts reaches a limit";

class BalanceWarningAction {
    constructor() {
        this.id = balanceWarningActionId;
        this.description = balanceWarningActionDescription;

        this.options = {
            balance: {
                type: "NUMBER",
                required: true,
                description: "Check total balance or filter for a specific few"
            },
            allAccounts: {
                type: "BOOLEAN",
                defaultValue: true,
                description: "Check total balance or filter for a specific few"
            },
            reverse: {
                type: "BOOLEAN",
                defaultValue: false,
                description: "Warn if the balance goes over the target value instead of under"
            }
        };

        this.type = "MUTATION";
        this.filters = [monetaryAccountFilterId];
        this.outputs = [consoleMessageOutputId];
    }
}

export default BalanceWarningAction;
