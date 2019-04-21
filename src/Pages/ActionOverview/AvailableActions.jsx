import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";

import PlusIcon from "@material-ui/icons/Add";

import { getActionStyle } from "../../Config/AutomationStyleConfig";

const styles = theme => ({
    paper: {
        padding: 16,
        display: "flex",
        alignItems: "center"
    },
    fillerDiv: {
        flexGrow: 1
    },
    svgIcon: {
        marginRight: 8
    },
    button: {
        padding: 5,
        minWidth: 36
    }
});

const AvailableActions = ({ classes, pipeline }) => {
    if (!pipeline.available || !pipeline.available.actions) {
        return (
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="body1">None available actions</Typography>
                </Paper>
            </Grid>
        );
    }

    const createNewAction = actionType => () => {
        console.log(actionType);
    };

    return Object.keys(pipeline.available.actions).map(actionType => {
        const actionInfo = pipeline.available.actions[actionType];

        const actionStyle = getActionStyle(actionType);
        const Icon = actionStyle.Icon || false;

        const inlineStyle = {};
        if (actionStyle.color) {
            inlineStyle.borderLeft = `6px solid ${actionStyle.color}`;
        }

        return (
            <Grid key={actionType} item xs={12} sm={12} md={6}>
                <Paper className={classes.paper} style={inlineStyle}>
                    {Icon && (
                        <SvgIcon color="action" className={classes.svgIcon}>
                            <Icon />
                        </SvgIcon>
                    )}
                    <div>
                        <Typography variant="body1">{actionInfo.title}</Typography>
                        <Typography variant="body2">{actionInfo.description}</Typography>
                    </div>

                    <div className={classes.fillerDiv} />
                    <Button
                        className={classes.button}
                        variant="outlined"
                        color="primary"
                        onClick={createNewAction(actionType)}
                    >
                        <PlusIcon />
                    </Button>
                </Paper>
            </Grid>
        );
    });
};

export default withStyles(styles)(AvailableActions);
