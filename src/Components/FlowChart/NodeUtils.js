export const getNodeType = type => {
    const splitParts = type.split(":");

    if (splitParts.length > 1) {
        return {
            type: splitParts[0],
            id: splitParts[1]
        };
    }

    return { type: type };
};
