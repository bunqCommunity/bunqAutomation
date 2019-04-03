export const THEME_DARK_MODE = "THEME_DARK_MODE";
export const THEME_PARTICLES = "THEME_PARTICLES";

export const defaultState = {
    darkMode: localStorage.getItem(THEME_DARK_MODE) !== "false",
    particles: localStorage.getItem(THEME_PARTICLES) !== "false"
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "THEME_TOGGLE":
            localStorage.setItem(THEME_DARK_MODE, !state.darkMode);
            return {
                ...state,
                darkMode: !state.darkMode
            };
        case "PARTICLES_TOGGLE":
            localStorage.setItem(THEME_PARTICLES, !state.darkMode);
            return {
                ...state,
                particles: !state.particles
            };

        default:
            return state;
    }
}
