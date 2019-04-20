import AccountCheck from "../Components/Icons/AccountCheck";
import ConsoleIcon from "../Components/Icons/Console";

import AccessTime from "@material-ui/icons/AccessTime";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import MailIcon from "@material-ui/icons/Mail";
import NotificationIcon from "@material-ui/icons/NotificationImportant";
import SavingsIcon from "@material-ui/icons/Save";

import { darkGreen, green, lightBlue, purple, salmon, grey } from "./Colors";

export const getActionStyle = actionType => {
    switch (actionType) {
        case "AUTO_SAVE_PERCENTAGE":
            return {
                Icon: SavingsIcon,
                color: purple
            };
        case "AUTOMATIC_REQUEST":
            return {
                Icon: AccountCheck,
                color: salmon
            };
        case "BALANCE_WARNING":
            return {
                Icon: NotificationIcon,
                color: darkGreen
            };
        case "MONTHLY_INVOICE":
            return {
                Icon: MailIcon,
                color: green
            };
        case "MUTATION_LOGGER":
            return {
                Icon: ConsoleIcon,
                color: grey
            };
        case "SCHEDULED_REQUEST":
            return {
                Icon: AccessTime,
                color: darkGreen
            };
        case "SPLIT_INCOMING_FUNDS":
            return {
                Icon: CallSplitIcon,
                color: lightBlue
            };

        default:
            return {};
    }
};
