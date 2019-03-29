import { combineReducers } from "redux";

import authentication from "./authentication";
import server_status from "./server_status";
import snackbar from "./snackbar";
import theme from "./theme";
import user from "./user";

export default combineReducers({
    authentication,
    server_status,
    snackbar,
    theme,
    user
});
