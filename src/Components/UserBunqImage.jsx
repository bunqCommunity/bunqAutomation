import React from "react";

import BunqImage from "./BunqImage";

export default ({ user, ...props }) => {
    let imageUuid = false;
    if (user) {
        const image = user.avatar.image[0];
        imageUuid = image.attachment_public_uuid;
    }
    return  <BunqImage imageUuid={imageUuid} {...props} />;
};
