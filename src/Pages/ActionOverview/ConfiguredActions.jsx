import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    paper: {
        padding: 8
    }
});

const ActionOverview = ({ classes, pipeline }) => {
    if (!pipeline.configuredActions) {
        return (
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="body1">No configured actions</Typography>
                </Paper>
            </Grid>
        );
    }

    return Object.keys(pipeline.configuredActions).map(actionType => {
        return (
            <Grid key={actionType} item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="body1">{actionType}</Typography>
                </Paper>
            </Grid>
        );
    });
};

export default withStyles(styles)(ActionOverview);
