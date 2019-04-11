import { getBunqApiKeys } from "./bunq_api_keys";

export const authenticationIsLoading = () => ({ type: "AUTHENTICATION_LOADING" });
export const authenticationIsNotLoading = () => ({ type: "AUTHENTICATION_NOT_LOADING" });

export const loginWithPassword = (password, callback = false) => {
    return dispatch => {
        dispatch(authenticationIsLoading());

        window.apiClient
            .post(`/setup/password`, {
                password: password
            })
            .then(data => {
                dispatch(getBunqApiKeys());

                dispatch(setApiKey(data.api_key));
                dispatch(authenticationIsNotLoading());
                window.socket && window.socket.emit("status");
            })
            .catch(error => {
                console.error(error);
                dispatch(authenticationIsNotLoading());
                window.socket && window.socket.emit("status");
            });
    };
};

export const loginBunqApiKey = (bunqApiKey, environment, deviceName = false, callback = false) => {
    return dispatch => {
        dispatch(authenticationIsLoading());

        window.apiClient
            .post(`/setup/api-key`, {
                api_key: bunqApiKey,
                environment: environment,
                device_name: deviceName
            })
            .then(() => {
                dispatch(getBunqApiKeys());

                dispatch(authenticationIsNotLoading());
                window.socket && window.socket.emit("status");
                if (callback) callback(true);
            })
            .catch(error => {
                dispatch(authenticationIsNotLoading());
                window.socket && window.socket.emit("status");
                if (callback) callback(error);
            });
    };
};

export const setApiKey = api_key => {
    window.apiClient.setApiKey(api_key);

    return {
        type: "AUTHENTICATION_SET_API_KEY",
        payload: {
            api_key
        }
    };
};

export const logout = () => {
    window.apiClient.setApiKey(false);

    return { type: "AUTHENTICATION_LOGOUT" };
};

export const validateApiKey = apiKey => {
    return dispatch => {
        dispatch(authenticationIsLoading());

        window.apiClient
            .post(
                `/setup/validate-api-key`,
                {},
                {
                    headers: {
                        "x-bunq-automation-authorization": apiKey
                    }
                }
            )
            .then(() => {
                dispatch(getBunqApiKeys());

                dispatch(authenticationIsNotLoading());
                window.socket && window.socket.emit("status");
            })
            .catch(() => {
                dispatch(logout());
                dispatch(authenticationIsNotLoading());
                window.socket && window.socket.emit("status");
            });
    };
};
