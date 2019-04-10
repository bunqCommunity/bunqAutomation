import { useEffect, useState } from "react";
import { useMappedState } from "redux-react-hook";

const mapState = state => ({
    apiKey: state.authentication.api_key,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

export default () => {
    const [monetaryAccounts, setMonetaryAccounts] = useState(false);
    const { apiKey, serverStatusChecked, serverStatus } = useMappedState(mapState);

    const updateMonetaryAccounts = () => {
        window.apiClient
            .get(`/bunq/monetary-accounts`)
            .then(result => {
                setMonetaryAccounts(result.monetary_accounts);
            })
            .catch(error => {
                console.error(error);
                setMonetaryAccounts([]);
            });
    };

    useEffect(() => {
        // all details available and server is ready
        if (!monetaryAccounts && apiKey && serverStatusChecked && serverStatus === "STATUS_API_READY") {
            updateMonetaryAccounts();
        }
    }, [apiKey, serverStatusChecked, serverStatus]);

    return [monetaryAccounts, updateMonetaryAccounts];
};
