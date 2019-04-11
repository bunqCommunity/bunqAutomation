import { useDispatch } from "redux-react-hook";

const useBunqApiKeysActions = () => {
    const dispatch = useDispatch();

    const getBunqApiKeys = () => {
        bunqApiKeysIsLoading();

        window.apiClient
            .get(`/bunq-api-keys`)
            .then(data => {
                setBunqApiKeys(data.bunqApiKeys ? data.bunqApiKeys : false);
                bunqApiKeysIsNotLoading();
            })
            .catch(error => {
                console.error(error);
                bunqApiKeysIsNotLoading();
            });
    };

    const setBunqApiKeys = bunqApiKeys => {
        dispatch({
            type: "BUNQ_API_KEYS_SET_INFO",
            payload: {
                bunqApiKeys
            }
        });
    };

    const bunqApiKeysIsLoading = () => {
        dispatch({ type: "BUNQ_API_KEYS_LOADING" });
    };
    const bunqApiKeysIsNotLoading = () => {
        dispatch({ type: "BUNQ_API_KEYS_NOT_LOADING" });
    };

    return {
        getBunqApiKeys,
        setBunqApiKeys,
        bunqApiKeysIsLoading,
        bunqApiKeysIsNotLoading
    };
};

export default useBunqApiKeysActions;
