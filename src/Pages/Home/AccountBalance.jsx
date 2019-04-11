import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import PieChartIcon from "@material-ui/icons/PieChart";

import AccountBalancePieChart from "../../Components/Charts/AccountBalancePieChart";
import PaperSectionHeader from "../../Components/PaperSectionHeader";

import useMonetaryAccounts from "../../Redux/Hooks/useMonetaryAccounts";

const styles = () => ({
    paper: {
        padding: 16,
        height: 416
    },
    paperHeader: {
        display: "flex",
        margin: 8
    },
    paperHeaderText: {
        marginLeft: 8
    },
    paperHeaderFill: {
        flexGrow: 1
    },
    updateIcon: {
        cursor: "pointer"
    }
});

const AccountBalance = ({ classes }) => {
    const { updateMonetaryAccounts, monetaryAccounts, monetaryAccountsLoading } = useMonetaryAccounts();

    return (
        <React.Fragment>
            <PaperSectionHeader
                secondaryIcon={true}
                title="Account balance"
                icon={PieChartIcon}
                onClick={updateMonetaryAccounts}
                loading={monetaryAccountsLoading}
            />

            <Paper className={classes.paper}>
                <AccountBalancePieChart monetaryAccounts={monetaryAccounts} />
            </Paper>
        </React.Fragment>
    );
};

export default withTheme()(withStyles(styles)(AccountBalance));
