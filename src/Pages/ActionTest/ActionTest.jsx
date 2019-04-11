import React from "react";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";

import Content from "../../Components/Content/Content";

import CustomCanvas from "../../Components/FlowChart/CustomCanvas";
import CustomNode from "../../Components/FlowChart/CustomNode";
import CustomNodeInner from "../../Components/FlowChart/CustomNodeInner";
import CustomPort from "../../Components/FlowChart/CustomPort";

const standardLeftPort = id =>
    Object.assign(
        {},
        {
            id: id,
            type: "left",
            properties: {
                icon: "arrow-left"
            }
        }
    );
const standardRightPort = id =>
    Object.assign(
        {},
        {
            id: id,
            type: "right",
            properties: {
                icon: "arrow-right"
            }
        }
    );

export const chart = {
    offset: {
        x: 0,
        y: 0
    },
    nodes: {
        node1: {
            id: "node1",
            type: "action:monthly-request",
            position: {
                x: 50,
                y: 100
            },
            ports: {
                port1: standardRightPort("port1")
            }
        },
        node2: {
            id: "node2",
            type: "filter:test",
            position: {
                x: 200,
                y: 100
            },
            ports: {
                port1: standardLeftPort("port1"),
                port2: standardRightPort("port2")
            }
        },
        node3: {
            id: "node3",
            type: "filter:test",
            position: {
                x: 350,
                y: 100
            },
            ports: {
                port1: standardLeftPort("port1"),
                port2: standardRightPort("port2")
            }
        },
        node4: {
            id: "node4",
            type: "output:request",
            position: {
                x: 500,
                y: 100
            },
            ports: {
                port1: standardLeftPort("port1"),
                port2: standardRightPort("port2")
            }
        }
    },
    links: {
        link1: {
            id: "link1",
            from: {
                nodeId: "node1",
                portId: "port1"
            },
            to: {
                nodeId: "node2",
                portId: "port1"
            }
        },
        link2: {
            id: "link2",
            from: {
                nodeId: "node2",
                portId: "port2"
            },
            to: {
                nodeId: "node3",
                portId: "port1"
            }
        },
        link3: {
            id: "link3",
            from: {
                nodeId: "node3",
                portId: "port2"
            },
            to: {
                nodeId: "node4",
                portId: "port1"
            }
        }
    },
    selected: {},
    hovered: {}
};

const ActionTest = () => {
    return (
        <Content title="bunqAutomation - Action test">
            <FlowChartWithState
                initialValue={chart}
                Components={{
                    Port: CustomPort,
                    Node: CustomNode,
                    NodeInner: CustomNodeInner,
                    CanvasOuter: CustomCanvas
                }}
            />
        </Content>
    );
};

export default ActionTest;
