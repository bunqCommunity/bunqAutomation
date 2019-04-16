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

export const generateCurvePath = (startPos, endPos) => {
    const width = Math.abs(startPos.x - endPos.x);
    const height = Math.abs(startPos.y - endPos.y);
    const leftToRight = startPos.x < endPos.x;
    const topToBottom = startPos.y < endPos.y;
    const isHorizontal = width > height;

    let start;
    let end;
    if (isHorizontal) {
        start = leftToRight ? startPos : endPos;
        end = leftToRight ? endPos : startPos;
    } else {
        start = topToBottom ? startPos : endPos;
        end = topToBottom ? endPos : startPos;
    }

    const curve = isHorizontal ? width / 3 : height / 3;
    const curveX = isHorizontal ? curve : 0;
    const curveY = isHorizontal ? 0 : curve;

    return {
        curvePath: `M${start.x},${start.y} C ${start.x + curveX},${start.y + curveY} ${end.x - curveX},${end.y -
            curveY} ${end.x},${end.y}`,
        isHorizontal,
        leftToRight,
        topToBottom
    };
};
