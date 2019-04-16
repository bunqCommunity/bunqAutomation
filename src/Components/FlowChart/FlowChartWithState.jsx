import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import { FlowChart } from "@mrblenny/react-flow-chart";
import * as flowChartActions from "@mrblenny/react-flow-chart/src/container/actions";

import CustomLink from "./CustomLink";
import CustomPort from "./CustomPort";
import CustomNode from "./CustomNode";
import CustomNodeInner from "./CustomNodeInner";
import CustomCanvas from "./CustomCanvas";

import "./FlowChartWithState.scss";

const styles = theme => ({
    flowChartWrapper: {
        overflow: "hidden"
    }
});

class FlowChartWithState extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.initialChart;
    }

    render() {
        const { initialChart, classes, className, callbacks, ...otherProps } = this.props;

        const stateActions = {};
        Object.keys(flowChartActions).forEach(eventName => {
            const flowChartAction = flowChartActions[eventName];
            stateActions[eventName] = (...params) => {
                const defaultCallback = flowChartAction(...params);

                // check for custom callbacks
                if (callbacks[eventName]) {
                    callbacks[eventName](this.state, ...params);
                }

                // always call the default callback
                const modifiedChart = defaultCallback(this.state);
                console.log(eventName, params);
                this.setState(modifiedChart);
            };
        });

        return (
            <div className={classNames(className, classes.flowChartWrapper)} {...otherProps}>
                <FlowChart
                    chart={this.state}
                    callbacks={stateActions}
                    Components={{
                        Port: CustomPort,
                        Node: CustomNode,
                        Link: CustomLink,
                        NodeInner: CustomNodeInner,
                        CanvasOuter: CustomCanvas
                    }}
                />
            </div>
        );
    }
}

FlowChartWithState.defaultProps = {
    className: ""
};

export default withStyles(styles)(FlowChartWithState);
