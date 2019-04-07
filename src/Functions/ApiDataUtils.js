export const getUserImageUuid = user => {
    return getAvatarImageUuid(user.avatar);
};

export const getAvatarImageUuid = avatar => {
    if (!avatar.image) return false;
    if (!avatar.image[0]) return false;

    return avatar.image[0].attachment_public_uuid;
};
