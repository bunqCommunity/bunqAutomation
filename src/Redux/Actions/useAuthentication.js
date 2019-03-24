import axios from "axios";
import { useDispatch, useMappedState } from "redux-react-hook";

import LevelDb from "../../LevelDb";
import { API_KEY_LOCATION } from "../Reducers/authentication";
import useServerStatus from "./useServerStatus";

const mapState = state => ({
    apiKey: state.authentication.api_key
});

const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;
const levelDb = new LevelDb("authentication");

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

    const loadStoredApiKey = () => {
        levelDb
            .get(API_KEY_LOCATION)
            .then(storedApiKey => {
                if (storedApiKey) {
                    setApiKey(storedApiKey);
                    validateApiKey(storedApiKey);
                }
                authenticationIsNotLoading();
            })
            .catch(err => console.error(err));
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
            })
            .catch(() => {
                logout();
                authenticationIsNotLoading();
            });
    };

    return {
        loadStoredApiKey,
        loginWithPassword,
        authenticationIsLoading,
        authenticationIsNotLoading,
        setBunqApiKey,
        validateApiKey,
        logout
    };
};

export default useAuthentication;
