import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";

import SandboxIcon from "@material-ui/icons/BugReport";

import Content from "../../Components/Content/Content";

const BunqApiKeys = () => {
    const [bunqApiKeys, setBunqApiKeys] = useState({});

    const checkStoredApiKeys = () => {
        window.apiClient
            .get(`/setup/api-keys`)
            .then(result => {
                setBunqApiKeys(result.loaded);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => checkStoredApiKeys(), []);

    const bunqApiKeyListItems = Object.keys(bunqApiKeys).map(identifier => {
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
        <Content title="bunqAutomation - bunq API key overview">
            <Paper style={{ padding: 12 }}>
                <Typography variant="h5">bunq API keys</Typography>
                <List>
                    {bunqApiKeyListItems}
                </List>
            </Paper>
        </Content>
    );
};

export default BunqApiKeys;
