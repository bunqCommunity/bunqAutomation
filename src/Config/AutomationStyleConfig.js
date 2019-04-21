import AccountCheck from "../Components/Icons/AccountCheck";
import ConsoleIcon from "../Components/Icons/Console";

import AccessTime from "@material-ui/icons/AccessTime";
import CallSplitIcon from "@material-ui/icons/CallSplit";
import MailIcon from "@material-ui/icons/Mail";
import NotificationIcon from "@material-ui/icons/NotificationImportant";
import SavingsIcon from "@material-ui/icons/Save";

import { getColorByIndex } from "./Colors";

export const getActionStyle = actionType => {
    switch (actionType) {
        case "AUTO_SAVE_PERCENTAGE":
            return {
                Icon: SavingsIcon,
                color: getColorByIndex(1)
            };
        case "AUTOMATIC_REQUEST":
            return {
                Icon: AccountCheck,
                color: getColorByIndex(11)
            };
        case "BALANCE_WARNING":
            return {
                Icon: NotificationIcon,
                color: getColorByIndex(0)
            };
        case "MONTHLY_INVOICE":
            return {
                Icon: MailIcon,
                color: getColorByIndex(6)
            };
        case "MUTATION_LOGGER":
            return {
                Icon: ConsoleIcon,
                color: getColorByIndex(9)
            };
        case "SCHEDULED_REQUEST":
            return {
                Icon: AccessTime,
                color: getColorByIndex(10)
            };
        case "SPLIT_INCOMING_FUNDS":
            return {
                Icon: CallSplitIcon,
                color: getColorByIndex(12)
            };

        default:
            return {};
    }
};
