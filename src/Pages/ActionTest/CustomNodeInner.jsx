import React from "react";

import { getNodeType } from "./NodeUtils";

const NodeInnerCustom = ({ node }) => {
    const nodeTypes = getNodeType(node.type);

    switch (nodeTypes.type) {
        case "action":
            return (
                <div style={{ padding: 30 }}>
                    <p>Action</p>
                </div>
            );
        case "filter":
            return (
                <div style={{ padding: 30 }}>
                    <p>Filter</p>
                </div>
            );
        case "output":
            return (
                <div style={{ padding: 30 }}>
                    <p>Output</p>
                </div>
            );
        default:
            return (
                <div style={{ padding: 30 }}>
                    <p>Default</p>
                </div>
            );
    }
};

export default NodeInnerCustom;
