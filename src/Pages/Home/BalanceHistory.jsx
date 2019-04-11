import React, { useState } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Finance from "../../Components/Icons/Finance";

import BalanceHistoryGraph from "../../Components/Charts/BalanceHistoryGraph";
import PaperSectionHeader from "../../Components/PaperSectionHeader";

const styles = () => ({
    paper: {
        padding: 8,
        height: 416
    }
});

const BalanceHistory = ({ classes, theme }) => {
    const [forceUpdate, setForceUpdate] = useState(new Date());

    return (
        <React.Fragment>
            <PaperSectionHeader
                secondaryIcon={true}
                title="Balance history"
                icon={Finance}
                onClick={() => setForceUpdate(new Date())}
            />

            <Paper className={classes.paper}>
                <BalanceHistoryGraph forceUpdate={forceUpdate} />
            </Paper>
        </React.Fragment>
    );
};

export default withTheme()(withStyles(styles)(BalanceHistory));
