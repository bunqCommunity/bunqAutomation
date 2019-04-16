import * as dagre from "dagre";
import { standardLeftPort, standardRightPort } from "./Defaults";

const dagreGridSize = {
    width: 150,
    height: 150
};

export const mapDagreNodes = nodes => {
    return Object.keys(nodes).map(nodeId => {
        return { id: nodeId, metadata: { ...dagreGridSize, id: nodeId } };
    });
};

export const mapDagreEdges = links => {
    return Object.keys(links).map(linkId => {
        return { from: links[linkId].from.nodeId, to: links[linkId].to.nodeId };
    });
};

export const actionConfigToFlowChart = actionConfig => {
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
