export const defaultState = {
    available: {},
    configured_actions: {},
    loading: true
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "PIPELINE_SET_AVAILABLE": {
            const available = action.payload.available;

            return {
                ...state,
                available: available
            };
        }
        case "PIPELINE_SET_CONFIGURED_ACTIONS": {
            const configuredActions = action.payload.configured_actions;

            return {
                ...state,
                configured_actions: configuredActions
            };
        }
        case "PIPELINE_LOADING":
            return {
                ...state,
                loading: true
            };
        case "PIPELINE_NOT_LOADING":
            return {
                ...state,
                loading: false
            };
        case "AUTHENTICATION_LOGOUT":
            return {
                ...defaultState,
                actions: {},
                loading: false
            };
        default:
            return state;
    }
}
