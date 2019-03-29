export const defaultState = {
    user: false,
    loading: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "USER_SET_INFO": {
            const user = action.payload.user;

            return {
                ...state,
                user: user
            };
        }
        case "USER_LOADING":
            return {
                ...state,
                loading: true
            };
        case "USER_NOT_LOADING":
            return {
                ...state,
                loading: false
            };
        case "USER_LOGOUT":
            return {
                ...defaultState
            };
        default:
            return state;
    }
}
