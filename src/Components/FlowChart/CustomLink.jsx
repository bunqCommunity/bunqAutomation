import React from "react";
import { generateCurvePath } from "./NodeUtils";

const CustomLink = ({
    link,
    startPos,
    endPos,
    onLinkMouseEnter,
    onLinkMouseLeave,
    onLinkClick,
    isHovered,
    isSelected
}) => {
    const { curvePath: points, topToBottom, isHorizontal } = generateCurvePath(startPos, endPos);

    let color = "#f1f1f1";
    let className = "custom-link-path";
    if (topToBottom || isHorizontal) {
        className = "custom-link-path reverse-dash";
    }

    return (
        <svg style={{ overflow: "visible", position: "absolute", cursor: "pointer", left: 0, right: 0 }}>
            <circle r="4" cx={startPos.x} cy={startPos.y} fill={color} />

            {/* Main line */}
            <path className={className} d={points} stroke={color} strokeWidth="3" fill="none" />

            {/* Thick line to make selection easier */}
            <path
                d={points}
                stroke={color}
                strokeWidth="20"
                fill="none"
                strokeLinecap="round"
                strokeOpacity={isHovered || isSelected ? 0.1 : 0}
                onMouseEnter={() => onLinkMouseEnter({ linkId: link.id })}
                onMouseLeave={() => onLinkMouseLeave({ linkId: link.id })}
                onClick={e => {
                    onLinkClick({ linkId: link.id });
                    e.stopPropagation();
                }}
            />
            <circle r="4" cx={endPos.x} cy={endPos.y} fill={color} />
        </svg>
    );
};

export default CustomLink;
