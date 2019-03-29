export const defaultState = {
    status: false,
    checked: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "SERVER_STATUS_SET_STATUS": {
            const checked = typeof action.payload.checked === "undefined" ? true : action.payload.checked;

            return {
                ...state,
                status: action.payload.status,
                checked: checked
            };
        }
        default:
            return state;
    }
}
