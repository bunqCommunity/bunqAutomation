import React from "react";

export default ({bunqApiKey, setBunqApiKey}) => {

    const createCredentials = () => {
        window.apiClient
            .post("/bunq/login/credentials")
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return null;
}
