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

export const setBunqApiKeysSelectKey = keyIdentifier => ({
    type: "BUNQ_API_KEYS_SELECT_KEY",
    payload: {
        key_identifier: keyIdentifier
    }
});

export const bunqApiKeysIsLoading = () => ({ type: "BUNQ_API_KEYS_LOADING" });

export const bunqApiKeysIsNotLoading = () => ({ type: "BUNQ_API_KEYS_NOT_LOADING" });
