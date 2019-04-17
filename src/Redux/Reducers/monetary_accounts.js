import MonetaryAccount from "../../Models/MonetaryAccount";

export const defaultState = {
    monetary_accounts: false,
    loading: false
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case "MONETARY_ACCOUNTS_SET_ACCOUNTS": {
            const monetaryAccounts = action.payload.monetary_accounts;

            const mappedMonetaryAccounts = monetaryAccounts.map(monetaryAccount => {
                return new MonetaryAccount(monetaryAccount);
            });

            return {
                ...state,
                monetary_accounts: mappedMonetaryAccounts
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
