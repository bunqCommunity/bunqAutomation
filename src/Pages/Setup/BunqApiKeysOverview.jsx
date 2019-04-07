import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import SandboxIcon from "@material-ui/icons/BugReport";

const styles = theme => ({
    subHeader: {
        textAlign: "left"
    }
});

const BunqApiKeysOverview = ({ classes }) => {
    const [storedApiKeys, setStoredApiKeys] = useState(false);

    const checkStoredApiKeys = () => {
        window.apiClient
            .get(`/setup/api-keys`)
            .then(result => {
                setStoredApiKeys(result.loaded);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => checkStoredApiKeys(), []);

    if (!storedApiKeys) return null;

    const bunqApiKeys = Object.keys(storedApiKeys).map(identifier => {
        const storedKey = storedApiKeys[identifier];

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
            {bunqApiKeys}
        </List>
    );
};

export default withStyles(styles)(BunqApiKeysOverview);
