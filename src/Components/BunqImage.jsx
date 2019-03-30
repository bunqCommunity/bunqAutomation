import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { useMappedState } from "redux-react-hook";

import { apiBaseUrl } from "../Classes/ApiClient";

const mapState = state => ({
    apiKey: state.authentication.api_key
});

export default ({ imageUuid, defaultImage = "./images/user_person.svg", ...props }) => {
    const { apiKey } = useMappedState(mapState);

    // api image target
    const imageUrlTarget = `${apiBaseUrl}/bunq/image/${imageUuid}?api_key=${apiKey}`;

    // fallback  to default
    const imageUrl = !imageUuid || !apiKey ? defaultImage : imageUrlTarget;

    return <Avatar src={imageUrl} {...props} />;
};
