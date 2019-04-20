import { combineReducers } from "redux";

import authentication from "./authentication";
import bunq_api_keys from "./bunq_api_keys";
import monetary_accounts from "./monetary_accounts";
import pipeline from "./pipeline";
import server_status from "./server_status";
import snackbar from "./snackbar";
import theme from "./theme";
import user from "./user";

export default combineReducers({
    authentication,
    bunq_api_keys,
    monetary_accounts,
    pipeline,
    server_status,
    snackbar,
    theme,
    user
});
