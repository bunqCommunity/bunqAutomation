import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import KeyIcon from "@material-ui/icons/VpnKey";
import WarningIcon from "@material-ui/icons/Warning";

import PaperSectionHeader from "../../Components/PaperSectionHeader";

const styles = theme => ({
    paper: {
        padding: 8
    }
});

const ConnectedBunqApiKeys = ({ classes }) => {
    const bunqApiKeys = {};

    const bunqApiKeyComponents = Object.keys(bunqApiKeys).map(identifier => {
        const bunqApiKey = bunqApiKeys[identifier];

        return (
            <React.Fragment key={identifier}>
                <ListItem button>
                    <ListItemIcon>
                        <Icon color={bunqApiKey.color || "action"}>{bunqApiKey.icon || "vpn_key"}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={bunqApiKey.deviceName} secondary={bunqApiKey.environment} />
                    {bunqApiKey.errorState ? (
                        <ListItemSecondaryAction>
                            <IconButton>
                                <WarningIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    ) : null}
                </ListItem>
            </React.Fragment>
        );
    });

    return (
        <React.Fragment>
            <PaperSectionHeader title="bunq API keys" icon={KeyIcon} />

            <Paper className={classes.paper}>
                <List>{bunqApiKeyComponents}</List>
            </Paper>
        </React.Fragment>
    );
};

export default withStyles(styles)(ConnectedBunqApiKeys);
