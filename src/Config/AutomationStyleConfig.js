import NotificationIcon from "@material-ui/icons/NotificationImportant";

import { darkGreen } from "./Colors";

export const getActionStyle = actionType => {
    switch (actionType) {
        case "BALANCE_WARNING":
            return {
                Icon: NotificationIcon,
                color: darkGreen
            };
        default:
            return {};
    }
};
