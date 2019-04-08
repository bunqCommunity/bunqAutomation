import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Content from "../../Components/Content/Content";

import BalanceGraph from "./BalanceGraph";
import ActionHistoryOverview from "./ActionHistoryOverview";

const styles = theme => ({
    paper: {
        padding: 8
    }
});

const Home = () => {
    return (
        <Content title="bunqAutomation - Dashboard">
            <Grid container spacing={16}>
                <Grid item xs={12} sm={7} md={8}>
                    <BalanceGraph />
                </Grid>
                <Grid item xs={12} sm={5} md={4}>
                    <ActionHistoryOverview />
                </Grid>
            </Grid>
        </Content>
    );
};

export default withStyles(styles)(Home);
