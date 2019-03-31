import LevelDb from "../../Classes/LevelDb";

const levelDb = new LevelDb("authentication");

export const API_KEY_LOCATION = "API_KEY";

export const defaultState = {
    api_key: false,
    loading: true
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "AUTHENTICATION_SET_API_KEY": {
            const apiKey = action.payload.api_key;
            levelDb
                .set(API_KEY_LOCATION, apiKey)
                .then(() => {})
                .catch(err => console.error(err));
            return {
                ...state,
                api_key: apiKey
            };
        }
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
            levelDb
                .remove(API_KEY_LOCATION)
                .then(() => {})
                .catch(err => console.error(err));
            return {
                ...defaultState,
                loading: false
            };
        default:
            return state;
    }
}
