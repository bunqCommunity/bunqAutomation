export const defaultState = {
    message: "",
    duration: 5000,
    open: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "SNACKBAR_OPEN":
            return {
                ...state,
                open: true,
                message: action.payload.message,
                duration: action.payload.duration
            };

        case "SNACKBAR_CLOSE":
            return {
                ...defaultState
            };
        default:
            return state;
    }
}
