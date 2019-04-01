export const defaultState = {
    darkMode: localStorage.getItem("THEME_DARK_MODE") !== "false"
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "THEME_TOGGLE":
            localStorage.setItem("THEME_DARK_MODE", !state.darkMode);
            return {
                ...state,
                darkMode: !state.darkMode
            };

        default:
            return state;
    }
}
