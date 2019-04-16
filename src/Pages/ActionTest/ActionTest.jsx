import React, { useEffect, useState } from "react";
import * as dagre from "dagre";
import Button from "@material-ui/core/Button";

import Content from "../../Components/Content/Content";
import FlowChartWithState from "../../Components/FlowChart/FlowChartWithState";

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

const dagreGridSize = {
    width: 150,
    height: 150
};

const mapDagreNodes = nodes => {
    return Object.keys(nodes).map(nodeId => {
        return { id: nodeId, metadata: { ...dagreGridSize, id: nodeId } };
    });
};
const mapDagreEdges = links => {
    return Object.keys(links).map(linkId => {
        return { from: links[linkId].from.nodeId, to: links[linkId].to.nodeId };
    });
};

const actionConfigToFlowChart = actionConfig => {
    const chart = {
        offset: {
            x: 0,
            y: 0
        },
        nodes: {},
        links: {},
        selected: {},
        hovered: {}
    };

    chart.nodes[actionConfig.uuid] = {
        id: actionConfig.uuid,
        type: `action:${actionConfig.action}`,
        configType: "action",
        children: actionConfig.children ? actionConfig.children : [],
        position: {
            x: 50,
            y: 50
        },
        ports: {
            output: standardRightPort("output")
        }
    };
    Object.keys(actionConfig.filters).forEach(filterId => {
        const filter = actionConfig.filters[filterId];

        chart.nodes[filterId] = {
            id: filterId,
            type: `filter:${filter.type}`,
            configType: "filter",
            children: filter.children ? filter.children : [],
            column: 1,
            ports: {
                input: standardLeftPort("input"),
                output: standardRightPort("output")
            }
        };
    });
    Object.keys(actionConfig.outputs).forEach(outputId => {
        const output = actionConfig.outputs[outputId];

        chart.nodes[outputId] = {
            id: outputId,
            type: `output:${output.type}`,
            configType: "output",
            children: output.children ? output.children : [],
            column: 2,
            ports: {
                input: standardLeftPort("input"),
                output: standardRightPort("output")
            }
        };
    });

    // setup all links
    Object.keys(chart.nodes).forEach(nodeId => {
        const node = chart.nodes[nodeId];

        node.children.forEach(childId => {
            const linkId = `${nodeId}:${childId}`;

            chart.links[linkId] = {
                id: linkId,
                from: {
                    nodeId: nodeId,
                    portId: "output"
                },
                to: {
                    nodeId: childId,
                    portId: "input"
                }
            };
        });
    });

    const rankDirection = "LR";

    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({
        rankDir: rankDirection
    });

    // map our nodes to a dagre compatible node
    const dagreNodes = mapDagreNodes(chart.nodes);
    dagreNodes.forEach(dagreNode => {
        dagreGraph.setNode(dagreNode.id, dagreNode.metadata);
    });

    // map our links to dagre edges so it knows in what order to put the nodes
    const dagreEdges = mapDagreEdges(chart.links);
    dagreEdges.forEach(dagreEdge => {
        dagreGraph.setEdge(dagreEdge.from, dagreEdge.to);
    });

    dagre.layout(dagreGraph);

    dagreGraph.nodes().forEach(node => {
        const dagreNode = dagreGraph.node(node);
        chart.nodes[node].position = {
            x: dagreNode.x,
            y: dagreNode.y
        };
    });

    return chart;
};

const ActionTest = () => {
    const [actionConfig, setActionConfig] = useState(false);
    const [flowChart, setFlowChart] = useState(false);

    useEffect(() => {
        window.apiClient
            .get("/automation/pipeline/test")
            .then(result => setActionConfig(result))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (!actionConfig) return;

        const flowChartResult = actionConfigToFlowChart(actionConfig);
        setFlowChart(flowChartResult);
    }, [JSON.stringify(actionConfig)]);

    const addFilter = () => {
        const newFilterId = new Date().getTime();
        const clonedConfig = { ...actionConfig };

        clonedConfig.children = [...actionConfig.children];
        clonedConfig.children.push(newFilterId);

        clonedConfig.filters = { ...actionConfig.filters };
        clonedConfig.filters[newFilterId] = {
            type: "MONETARY_ACCOUNT",
            children: [Object.keys(actionConfig.outputs)[0]]
        };

        setActionConfig(clonedConfig);
    };
    const addFilter2 = () => {
        const newFilterId = new Date().getTime();
        const clonedConfig = { ...actionConfig };

        clonedConfig.filters = { ...actionConfig.filters };

        const firstFilterId = Object.keys(clonedConfig.filters)[0];
        const firstFilter = clonedConfig.filters[firstFilterId];
        firstFilter.children = [newFilterId];

        clonedConfig.filters[newFilterId] = {
            type: "MONETARY_ACCOUNT",
            children: [Object.keys(actionConfig.outputs)[0]]
        };

        setActionConfig(clonedConfig);
    };

    if (!flowChart) return null;

    return (
        <Content title="bunqAutomation - Action test">
            <Button variant="outlined" style={{ margin: 8 }} color="primary" onClick={addFilter}>
                Add new filter
            </Button>
            <Button variant="outlined" style={{ margin: 8 }} color="primary" onClick={addFilter2}>
                Add nested filter
            </Button>
            <FlowChartWithState initialChart={flowChart} />
        </Content>
    );
};

export default ActionTest;
