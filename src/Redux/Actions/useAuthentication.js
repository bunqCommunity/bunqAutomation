import axios from "axios";
import { useDispatch } from "redux-react-hook";

const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

const useAuthentication = () => {
    const dispatch = useDispatch();

    const loginWithPassword = (password, callback = false) => {
        authenticationIsLoading();
        axios
            .post(`${apiBaseUrl}/setup/password`, {
                password: password
            })
            .then(response => response.data)
            .then(data => {
                setApiKey(data.api_key);
                authenticationIsNotLoading();
                window.socket && window.socket.emit("status");
            })
            .catch(error => {
                console.error(error);
                authenticationIsNotLoading();
                window.socket && window.socket.emit("status");
            });
    };

    const loginBunqApiKey = (bunqApiKey, environment, deviceName = false, callback = false) => {
        authenticationIsLoading();
        window.apiClient
            .post(`${apiBaseUrl}/setup/api-key`, {
                api_key: bunqApiKey,
                environment: environment,
                device_name: deviceName
            })
            .then(() => {
                authenticationIsNotLoading();
                window.socket && window.socket.emit("status");
                if (callback) callback(true);
            })
            .catch(error => {
                authenticationIsNotLoading();
                window.socket && window.socket.emit("status");
                if (callback) callback(error);
            });
    };

    const setApiKey = api_key => {
        window.apiClient.setApiKey(api_key);

        dispatch({
            type: "AUTHENTICATION_SET_API_KEY",
            payload: {
                api_key
            }
        });
    };

    const logout = () => {
        window.apiClient.setApiKey(false);
        dispatch({ type: "AUTHENTICATION_LOGOUT" });
    };

    const authenticationIsLoading = () => {
        dispatch({ type: "AUTHENTICATION_LOADING" });
    };
    const authenticationIsNotLoading = () => {
        dispatch({ type: "AUTHENTICATION_NOT_LOADING" });
    };

    const validateApiKey = apiKey => {
        axios
            .post(
                `${apiBaseUrl}/setup/validate-api-key`,
                {},
                {
                    headers: {
                        "x-bunq-automation-authorization": apiKey
                    }
                }
            )
            .then(response => response.data)
            .then(() => {
                authenticationIsNotLoading();
                window.socket && window.socket.emit("status");
            })
            .catch(() => {
                logout();
                authenticationIsNotLoading();
                window.socket && window.socket.emit("status");
            });
    };

    return {
        loginWithPassword,
        loginBunqApiKey,
        authenticationIsLoading,
        authenticationIsNotLoading,
        validateApiKey,
        logout
    };
};

export default useAuthentication;
