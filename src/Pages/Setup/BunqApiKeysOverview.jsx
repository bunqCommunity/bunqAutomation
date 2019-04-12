import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useDispatch, useMappedState } from "redux-react-hook";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import SandboxIcon from "@material-ui/icons/BugReport";

import { getBunqApiKeys } from "../../Redux/Actions/bunq_api_keys";

const styles = theme => ({
    subHeader: {
        textAlign: "left"
    }
});

const mapState = state => ({
    bunqApiKeys: state.bunq_api_keys.bunq_api_keys,
    bunqApiKeysLoading: state.bunq_api_keys.loading
});
const BunqApiKeysOverview = ({ classes }) => {
    const dispatch = useDispatch();
    const { bunqApiKeys, bunqApiKeysLoading } = useMappedState(mapState);

    useEffect(() => dispatch(getBunqApiKeys()), []);

    if (!bunqApiKeys) return null;

    const bunqApiKeyItems = Object.keys(bunqApiKeys).map(identifier => {
        const storedKey = bunqApiKeys[identifier];

        return (
            <ListItem key={identifier}>
                <ListItemText
                    primary={storedKey.deviceName}
                    secondary={storedKey.errorState ? "Has errors" : "Active and ready"}
                />
                <ListItemSecondaryAction>
                    <ListItemIcon>{storedKey.environment === "SANDBOX" ? <SandboxIcon /> : null}</ListItemIcon>
                </ListItemSecondaryAction>
            </ListItem>
        );
    });

    return (
        <List>
            <ListSubheader className={classes.subHeader}>Available API keys</ListSubheader>
            {bunqApiKeyItems}
        </List>
    );
};

export default withStyles(styles)(BunqApiKeysOverview);
