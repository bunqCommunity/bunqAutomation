import React from "react";

import BunqImage from "./BunqImage";

export default ({ object, ...props }) => {
    let imageUuid = false;
    if (object) {
        const image = object.avatar.image[0];
        imageUuid = image.attachment_public_uuid;
    }
    return <BunqImage imageUuid={imageUuid} {...props} />;
};
