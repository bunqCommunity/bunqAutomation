import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Content from "../../Components/Content/Content";
import FlowChartWithState from "../../Components/FlowChart/FlowChartWithState";
import { actionConfigToFlowChart } from "../../Components/FlowChart/Dagre";

const styles = theme => ({
    flowChart: {
        maxHeight: 600
    }
});

const ActionDetails = ({ classes }) => {
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

            <FlowChartWithState
                initialChart={flowChart}
                key={JSON.stringify(flowChart)}
                className={classes.flowChart}
                callbacks={{
                    onNodeClick: (chart, ...params) => {
                        console.log("Chart", chart);
                        console.log("Params", ...params);
                    }
                }}
            />
        </Content>
    );
};

export default withStyles(styles)(ActionDetails);
