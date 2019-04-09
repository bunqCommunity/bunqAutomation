import React from "react";

import { getNodeType } from "./NodeUtils";

const standardStyles = {
    position: "absolute",
    borderRadius: 10
};

const getSelectedStyle = isSelected => {
    return isSelected
        ? {
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 10px 20px"
          }
        : {};
};

const NodeCustom = ({ node, isSelected, style, children, ...otherProps }) => {
    const nodeTypes = getNodeType(node.type);
    const selectedStyle = getSelectedStyle(isSelected);

    switch (nodeTypes.type) {
        case "action":
            return (
                <div
                    {...otherProps}
                    style={{
                        ...style,
                        ...standardStyles,
                        ...selectedStyle,
                        background: "#3772f8",
                        color: "white"
                    }}
                >
                    {children}
                </div>
            );
        case "filter":
            return (
                <div
                    {...otherProps}
                    style={{
                        ...style,
                        ...standardStyles,
                        ...selectedStyle,
                        background: "#ff0031",
                        color: "white"
                    }}
                >
                    {children}
                </div>
            );
        case "output":
            return (
                <div
                    {...otherProps}
                    style={{
                        ...style,
                        ...standardStyles,
                        ...selectedStyle,
                        background: "#a200ff",
                        color: "white"
                    }}
                >
                    {children}
                </div>
            );
        default:
            return (
                <div
                    {...otherProps}
                    style={{
                        ...style,
                        ...standardStyles,
                        ...selectedStyle,
                        background: "#3e3e3e",
                        color: "white"
                    }}
                >
                    {children}
                </div>
            );
    }
};

export default NodeCustom;
