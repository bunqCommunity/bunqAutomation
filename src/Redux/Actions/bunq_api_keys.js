import { updateUser } from "./user";
import { updateMonetaryAccounts } from "./monetary_accounts";

export const getBunqApiKeys = () => {
    return dispatch => {
        dispatch(bunqApiKeysIsLoading());

        window.apiClient
            .get(`/bunq-api-keys`)
            .then(data => {
                dispatch(setBunqApiKeys(data.bunq_api_keys));
                dispatch(bunqApiKeysIsNotLoading());
            })
            .catch(error => {
                console.error(error);
                dispatch(bunqApiKeysIsNotLoading());
            });
    };
};

export const setBunqApiKeys = bunqApiKeys => ({
    type: "BUNQ_API_KEYS_SET_API_KEYS",
    payload: {
        bunq_api_keys: bunqApiKeys
    }
});

export const selectBunqApiKey = keyIdentifier => {
    return dispatch => {
        dispatch({
            type: "BUNQ_API_KEYS_SELECT_KEY",
            payload: {
                key_identifier: keyIdentifier
            }
        });

        dispatch(updateUser(true));
        dispatch(updateMonetaryAccounts());
    };
};

export const bunqApiKeysIsLoading = () => ({ type: "BUNQ_API_KEYS_LOADING" });

export const bunqApiKeysIsNotLoading = () => ({ type: "BUNQ_API_KEYS_NOT_LOADING" });
