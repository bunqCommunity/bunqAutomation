export const updateMonetaryAccounts = () => {
    return dispatch => {
        dispatch(monetaryAccountsIsLoading());

        window.apiClient
            .get(`/bunq/:key/monetary-accounts`)
            .then(data => {
                dispatch(setMonetaryAccounts(data.monetary_accounts));
                dispatch(monetaryAccountsIsNotLoading());
            })
            .catch(error => {
                console.error(error);
                dispatch(monetaryAccountsIsNotLoading());
            });
    };
};

export const setMonetaryAccounts = monetaryAccounts => ({
    type: "MONETARY_ACCOUNTS_SET_INFO",
    payload: {
        monetary_accounts: monetaryAccounts
    }
});

export const monetaryAccountsIsLoading = () => ({ type: "MONETARY_ACCOUNTS_LOADING" });

export const monetaryAccountsIsNotLoading = () => ({ type: "MONETARY_ACCOUNTS_NOT_LOADING" });
