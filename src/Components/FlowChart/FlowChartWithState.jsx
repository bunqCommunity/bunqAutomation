import React from "react";
import { FlowChart } from "@mrblenny/react-flow-chart";
import * as flowChartActions from "@mrblenny/react-flow-chart/src/container/actions";

import CustomPort from "./CustomPort";
import CustomNode from "./CustomNode";
import CustomNodeInner from "./CustomNodeInner";
import CustomCanvas from "./CustomCanvas";

export default class FlowChartWithState extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.initialChart;
    }

    render() {
        console.log(this.state);
        console.log(flowChartActions);

        const stateActions = {};
        Object.keys(flowChartActions).forEach(eventName => {
            const flowChartAction = flowChartActions[eventName];
            stateActions[eventName] = (...params) => {
                const callback = flowChartAction(...params);
                const modifiedChart = callback(this.state);

                console.log(eventName, params, modifiedChart);
                this.setState(modifiedChart);
            };
        });

        return (
            <FlowChart
                chart={this.state}
                callbacks={stateActions}
                // key={JSON.stringify(flowChart)}
                Components={{
                    Port: CustomPort,
                    Node: CustomNode,
                    NodeInner: CustomNodeInner,
                    CanvasOuter: CustomCanvas
                }}
            />
        );
    }
}
