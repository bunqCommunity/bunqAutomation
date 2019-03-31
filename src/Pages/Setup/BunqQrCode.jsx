import React, { useState, useEffect } from "react";

import useInterval from "../../Hooks/useInterval";

export default ({ setBunqApiKey }) => {
    const [credentials, setCredentials] = useState(false);

    const createCredentials = () => {
        window.apiClient
            .post("/bunq/login/credentials")
            .then(setCredentials)
            .catch(error => {
                console.log(error);
            });
    };
    const checkCredentials = () => {
        window.apiClient
            .get(`/bunq/login/credentials/${credentials.uuid}`)
            .then(result => {
                if (result.status === "ACCEPTED") {
                    setBunqApiKey(result.api_key);
                    setCredentials(false);
                }
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => createCredentials(), []);

    useInterval(() => {
        if (credentials) {
            checkCredentials(credentials.uuid);
        }
    }, 3000);

    if (!credentials) return null;

    return <img alt="bunq login QR code" src={`data:image/png;base64, ${credentials.qr_base64}`}/>;
};
