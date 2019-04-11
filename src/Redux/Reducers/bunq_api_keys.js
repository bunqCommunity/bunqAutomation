export const SELECTED_BUNQ_API_KEY_LOCATION = "SELECTED_BUNQ_API_KEY";

export const defaultState = {
    bunq_api_keys: {},
    selected: localStorage.getItem(SELECTED_BUNQ_API_KEY_LOCATION),
    loading: true
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "BUNQ_API_KEYS_SET_API_KEYS": {
            const bunqApiKeys = action.payload.bunq_api_keys;

            // check if selected key still exists
            let selectedKey = state.selected;
            if (!state.selected || !bunqApiKeys[state.selected]) {
                selectedKey = Object.keys(bunqApiKeys)[0];
            }

            localStorage.setItem(SELECTED_BUNQ_API_KEY_LOCATION, selectedKey);
            if (window.apiClient) window.apiClient.selectBunqApiKey(selectedKey);

            return {
                ...state,
                bunq_api_keys: bunqApiKeys,
                selected: selectedKey
            };
        }
        case "BUNQ_API_KEYS_SELECT_KEY": {
            const selectedKey = action.payload.key_identifier;

            localStorage.setItem(SELECTED_BUNQ_API_KEY_LOCATION, selectedKey);
            if (window.apiClient) window.apiClient.selectBunqApiKey(selectedKey);

            return {
                ...state,
                selected: selectedKey
            };
        }
        case "BUNQ_API_KEYS_LOADING":
            return {
                ...state,
                loading: true
            };
        case "BUNQ_API_KEYS_NOT_LOADING":
            return {
                ...state,
                loading: false
            };

        case "AUTHENTICATION_LOGOUT":
            return {
                ...defaultState,
                bunq_api_keys: false,
                selected: localStorage.getItem(SELECTED_BUNQ_API_KEY_LOCATION),
                loading: false
            };
        default:
            return state;
    }
}
