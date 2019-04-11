import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { useMappedState } from "redux-react-hook";

const mapState = state => ({
    apiKey: state.authentication.api_key
});

export default ({ imageUuid, defaultImage = "./images/user_person.svg", ...props }) => {
    const { apiKey } = useMappedState(mapState);

    // api image target
    const imageUrlTarget = window.apiClient.formatUrl(`/bunq/:key/image/${imageUuid}`, {}, { inlineKey: true });

    console.log(imageUrlTarget);

    // fallback  to default
    const imageUrl = !imageUuid || !apiKey ? defaultImage : imageUrlTarget;

    return <Avatar src={imageUrl} {...props} />;
};
