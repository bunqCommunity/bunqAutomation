import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Content from "../../Components/Content/Content";

import BalanceGraph from "./BalanceHistory";
import ActionHistoryOverview from "./ActionHistoryOverview";
import ConfiguredActions from "./ConfiguredActions";
import AccountBalance from "./AccountBalance";

const styles = theme => ({
    paper: {
        padding: 8
    }
});

const Home = () => {
    return (
        <Content title="bunqAutomation - Dashboard">
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12} md={8}>
                    <BalanceGraph />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <AccountBalance />
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                    <ConfiguredActions itemXs={12} itemSm={12} itemMd={6} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <ActionHistoryOverview />
                </Grid>
            </Grid>
        </Content>
    );
};

export default withStyles(styles)(Home);
