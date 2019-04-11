export const defaultState = {
    monetary_accounts: false,
    loading: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "MONETARY_ACCOUNTS_SET_INFO": {
            const monetaryAccounts = action.payload.monetary_accounts;

            return {
                ...state,
                monetary_accounts: monetaryAccounts
            };
        }
        case "MONETARY_ACCOUNTS_LOADING":
            return {
                ...state,
                loading: true
            };
        case "MONETARY_ACCOUNTS_NOT_LOADING":
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
