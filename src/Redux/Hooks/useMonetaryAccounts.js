import { useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";

import { updateMonetaryAccounts } from "../Actions/monetary_accounts";

const mapState = state => ({
    authenticationLoading: state.authentication.loading,

    accounts: state.monetary_accounts.monetary_accounts,
    loading: state.monetary_accounts.loading
});

export default () => {
    const dispatch = useDispatch();
    const { accounts, loading } = useMappedState(mapState);

    useEffect(() => dispatch(updateMonetaryAccounts()), []);

    return {
        monetaryAccounts: accounts,
        monetaryAccountsLoading: loading,

        updateMonetaryAccounts: () => dispatch(updateMonetaryAccounts())
    };
};
