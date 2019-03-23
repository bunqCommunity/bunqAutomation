export const defaultState = {
    api_key: "",
    loading: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "AUTHENTICATION_LOGIN":
            return state;
        case "AUTHENTICATION_SET_API_KEY":
            return {
                ...state,
                api_key: action.payload.api_key
            };
        case "AUTHENTICATION_LOADING":
            return {
                ...state,
                loading: true
            };
        case "AUTHENTICATION_NOT_LOADING":
            return {
                ...state,
                loading: false
            };
        case "AUTHENTICATION_LOGOUT":
            return {
                ...defaultState
            };
        default:
            return state;
    }
}
