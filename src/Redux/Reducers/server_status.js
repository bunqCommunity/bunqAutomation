export const defaultState = {
    status: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "SERVER_STATUS_SET_STATUS":
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state;
    }
}
