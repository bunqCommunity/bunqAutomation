import { useDispatch } from "redux-react-hook";

const useMonetaryAccountsActions = () => {
    const dispatch = useDispatch();

    const getMonetaryAccounts = () => {
        monetaryAccountsIsLoading();

        window.apiClient
            .get(`/bunq/:key/monetary-accounts`)
            .then(data => {
                setMonetaryAccounts(data.monetaryAccounts ? data.monetaryAccounts : false);
                monetaryAccountsIsNotLoading();
            })
            .catch(error => {
                console.error(error);
                monetaryAccountsIsNotLoading();
            });
    };

    const setMonetaryAccounts = monetaryAccounts => {
        dispatch({
            type: "MONETARY_ACCOUNTS_SET_INFO",
            payload: {
                monetaryAccounts
            }
        });
    };

    const monetaryAccountsIsLoading = () => {
        dispatch({ type: "MONETARY_ACCOUNTS_LOADING" });
    };
    const monetaryAccountsIsNotLoading = () => {
        dispatch({ type: "MONETARY_ACCOUNTS_NOT_LOADING" });
    };

    const logout = () => {
        dispatch({ type: "MONETARY_ACCOUNTS_LOGOUT" });
    };

    return {
        getMonetaryAccounts,
        monetaryAccountsIsLoading,
        monetaryAccountsIsNotLoading,
        logout
    };
};

export default useMonetaryAccountsActions;
