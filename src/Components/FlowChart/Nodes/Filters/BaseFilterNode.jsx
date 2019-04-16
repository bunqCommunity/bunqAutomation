import React from "react";

import {getSelectedStyle, standardNodeStyles} from "../../Defaults";

const NodeCustom = ({ node, isSelected, style, children, ...props }) => {
    const selectedStyle = getSelectedStyle(isSelected);

    return (
        <div
            {...props}
            style={{
                ...style,
                ...standardNodeStyles,
                ...selectedStyle,
                background: "#ff0031",
                color: "white"
            }}
        >
            {children}
        </div>
    );
};

export default NodeCustom;
