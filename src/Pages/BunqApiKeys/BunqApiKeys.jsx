import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState, useDispatch } from "redux-react-hook";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LinearProgress from "@material-ui/core/LinearProgress";

import SandboxIcon from "@material-ui/icons/BugReport";
import ArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

import Content from "../../Components/Content/Content";
import PaperSectionHeader from "../../Components/PaperSectionHeader";

import { getBunqApiKeys, selectBunqApiKey } from "../../Redux/Actions/bunq_api_keys";

const styles = theme => ({
    gridItemRight: {
        textAlign: "right"
    }
});

const mapState = state => ({
    bunqApiKeys: state.bunq_api_keys.bunq_api_keys,
    selelctedApiKey: state.bunq_api_keys.selected,
    bunqApiKeysLoading: state.bunq_api_keys.loading
});

const BunqApiKeys = ({ classes }) => {
    const dispatch = useDispatch();
    const { bunqApiKeys, selelctedApiKey, bunqApiKeysLoading } = useMappedState(mapState);

    const bunqApiKeyListItems = Object.keys(bunqApiKeys).map(identifier => {
        const storedKey = bunqApiKeys[identifier];

        return (
            <ListItem button key={identifier} onClick={() => dispatch(selectBunqApiKey(identifier))}>
                {selelctedApiKey === identifier && (
                    <ListItemIcon>
                        <ArrowRightIcon />
                    </ListItemIcon>
                )}
                <ListItemText
                    inset={selelctedApiKey !== identifier}
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
        <Content title="bunqAutomation - API key overview">
            <Grid container spacing={16}>
                <Grid item xs={12} md={6}>
                    <PaperSectionHeader style={{ marginBottom: 16 }} variant="h5" title="bunq API keys" />

                    <Paper style={{ padding: 12 }}>
                        <Typography variant="h5" onClick={() => dispatch(getBunqApiKeys())}>
                            btn
                        </Typography>

                        {bunqApiKeysLoading && <LinearProgress />}

                        <List>{bunqApiKeyListItems}</List>
                    </Paper>
                </Grid>
            </Grid>
        </Content>
    );
};

export default withStyles(styles)(BunqApiKeys);
