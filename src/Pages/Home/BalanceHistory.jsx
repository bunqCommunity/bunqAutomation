import React, { useState } from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import Finance from "../../Components/Icons/Finance";
import Refresh from "@material-ui/icons/Refresh";

import BalanceHistoryGraph from "../../Components/Charts/BalanceHistoryGraph";

const styles = () => ({
    paper: {
        padding: 8,
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

const BalanceHistory = ({ classes, theme }) => {
    const [forceUpdate, setForceUpdate] = useState(new Date());

    return (
        <React.Fragment>
            <div className={classes.paperHeader}>
                <SvgIcon color="action">
                    <Finance />
                </SvgIcon>
                <Typography className={classes.paperHeaderText} variant="subtitle1">
                    Balance history
                </Typography>

                <span className={classes.paperHeaderFill} />
                <SvgIcon className={classes.updateIcon} onClick={() => setForceUpdate(new Date())} color="action">
                    <Refresh />
                </SvgIcon>
            </div>

            <Paper className={classes.paper}>
                <BalanceHistoryGraph forceUpdate={forceUpdate} />
            </Paper>
        </React.Fragment>
    );
};

export default withTheme()(withStyles(styles)(BalanceHistory));
