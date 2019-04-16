import React from "react";

import { getNodeType } from "./NodeUtils";
import { getSelectedStyle, standardNodeStyles } from "./Defaults";

import BaseActionNode from "./Nodes/Actions/BaseActionNode";
import BaseFilterNode from "./Nodes/Filters/BaseFilterNode";
import BaseOutputNode from "./Nodes/Outputs/BaseOutputNode";

const NodeCustom = ({ node, isSelected, ...props }) => {
    const nodeTypes = getNodeType(node.type);
    const selectedStyle = getSelectedStyle(isSelected);

    switch (nodeTypes.type) {
        case "action":
            return <BaseActionNode node={node} isSelected={isSelected} {...props} />;
        case "filter":
            return <BaseFilterNode node={node} isSelected={isSelected} {...props} />;
        case "output":
            return <BaseOutputNode node={node} isSelected={isSelected} {...props} />;
        default:
            return (
                <div
                    {...props}
                    style={{
                        ...props.style,
                        ...standardNodeStyles,
                        ...selectedStyle,
                        background: "#3e3e3e",
                        color: "white"
                    }}
                >
                    {props.children}
                </div>
            );
    }
};

NodeCustom.defaultProps = {
    style: {},
    children: ""
};

export default NodeCustom;
