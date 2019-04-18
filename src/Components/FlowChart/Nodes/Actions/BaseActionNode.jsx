import React from "react";

import { getSelectedStyle, standardNodeStyles } from "../../Defaults";

const NodeCustom = ({ node, isSelected, style, children, ...props }) => {
    const selectedStyle = getSelectedStyle(isSelected);

    return (
        <div
            {...props}
            style={{
                ...style,
                ...standardNodeStyles,
                ...selectedStyle,
                background: "#3772f8",
                color: "white"
            }}
        >
            {children}
        </div>
    );
};

export default NodeCustom;
