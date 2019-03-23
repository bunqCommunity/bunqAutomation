import axios from "axios";
import { useDispatch, useMappedState } from "redux-react-hook";

import useServerStatus from "./useServerStatus";

const mapState = state => ({
    apiKey: state.authentication.api_key
});

const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

const useAuthentication = () => {
    const dispatch = useDispatch();
    const { checkServerStatus } = useServerStatus();
    const { apiKey } = useMappedState(mapState);

    const loginWithPassword = password => {
        authenticationIsLoading();
        axios
            .post(`${apiBaseUrl}/setup/password`, {
                password: password
            })
            .then(response => response.data)
            .then(data => {
                setApiKey(data.api_key);
                authenticationIsNotLoading();
                checkServerStatus();
            })
            .catch(error => {
                console.error(error);
                authenticationIsNotLoading();
                checkServerStatus();
            });
    };

    const setApiKey = api_key => {
        dispatch({
            type: "AUTHENTICATION_SET_API_KEY",
            payload: {
                api_key
            }
        });
    };

    const setBunqApiKey = (bunqApiKey, environment) => {
        authenticationIsLoading();
        axios
            .post(
                `${apiBaseUrl}/setup/api-key`,
                {
                    api_key: bunqApiKey,
                    environment: environment
                },
                {
                    headers: {
                        "x-bunq-automation-authorization": apiKey
                    }
                }
            )
            .then(response => response.data)
            .then(data => {
                authenticationIsNotLoading();
                checkServerStatus();
            })
            .catch(error => {
                console.error(error);
                authenticationIsNotLoading();
                checkServerStatus();
            });
    };

    const logout = () => {
        dispatch({ type: "AUTHENTICATION_LOGOUT" });
    };

    const authenticationIsLoading = () => {
        dispatch({ type: "AUTHENTICATION_LOADING" });
    };
    const authenticationIsNotLoading = () => {
        dispatch({ type: "AUTHENTICATION_NOT_LOADING" });
    };

    return {
        loginWithPassword,
        authenticationIsLoading,
        authenticationIsNotLoading,
        setBunqApiKey,
        logout
    };
};

export default useAuthentication;
