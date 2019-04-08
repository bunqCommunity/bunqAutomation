import { useEffect, useState } from "react";
import { useMappedState } from "redux-react-hook";

const mapState = state => ({
    apiKey: state.authentication.api_key,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

export default () => {
    const [bunqApiKeys, setBunqApiKeys] = useState(false);
    const { apiKey, serverStatusChecked, serverStatus } = useMappedState(mapState);

    const checkStoredApiKeys = () => {
        window.apiClient
            .get(`/setup/api-keys`)
            .then(result => {
                setBunqApiKeys(result.loaded);
            })
            .catch(error => {
                console.error(error);
                setBunqApiKeys({});
            });
    };

    useEffect(() => {
        // all details available and server is ready
        if (!bunqApiKeys && apiKey && serverStatusChecked && serverStatus === "STATUS_API_READY") {
            checkStoredApiKeys();
        }
    }, [apiKey, serverStatusChecked, serverStatus]);

    return bunqApiKeys;
};
