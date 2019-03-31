import React, { useState, useEffect } from "react";
// import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import ServerIcon from "../../Components/Icons/Server";

import useAuthentication from "../../Redux/Actions/useAuthentication";
import BunqQrCode from "./BunqQrCode";

const styles = theme => ({
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginTop: 8
    },
    environmentSection: {
        padding: 8,
        paddingBottom: 16
    },
    environmentButtons: {
        width: 130,
        height: 130
    }
});

// const mapState = state => ({
//     loading: state.authentication.loading,
//
//     serverStatus: state.server_status.status
// });

const SetBunqKeySection = ({ classes }) => {
    // const { serverStatus, loading } = useMappedState(mapState);
    const { setBunqApiKey } = useAuthentication();

    // set a password
    const [bunqApiKey, setBunqApiKeyField] = useState("");
    const [deviceName, setDeviceName] = useState("bunqAutomation server");
    const [environment, setEnvironment] = useState(false);
    const [error, setError] = useState("");

    const login = () => {
        if (!error) {
            setBunqApiKey(bunqApiKey, environment);
        }
    };

    const setBunqKeyCb = e => setBunqApiKeyField(e.target.value);
    const setDeviceNameCb = e => setDeviceName(e.target.value);

    const createSandboxUser = () => {
        window.apiClient
            .post("/bunq/login/sandbox-user")
            .then(setBunqApiKeyField)
            .catch(error => {
                console.log(error);
            });
    };

    if (environment === false) {
        return (
            <Grid container className={classes.environmentSection}>
                <Grid item xs={6}>
                    <Button
                        className={classes.environmentButtons}
                        variant="contained"
                        color="primary"
                        onClick={() => setEnvironment("PRODUCTION")}
                    >
                        Production
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className={classes.environmentButtons}
                        variant="contained"
                        color="secondary"
                        onClick={() => setEnvironment("SANDBOX")}
                    >
                        Sandbox
                    </Button>
                </Grid>
            </Grid>
        );
    }

    if (environment === "SANDBOX") {
        return (
            <Grid container spacing={8} className={classes.environmentSection}>
                <Grid item xs={12} sm={6} md={8}>
                    <TextField
                        className={classes.textField}
                        label="Api key"
                        value={bunqApiKey}
                        onChange={setBunqKeyCb}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Button
                        onClick={createSandboxUser}
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                    >
                        Create user
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        label="Device name"
                        value={deviceName}
                        onChange={setDeviceNameCb}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        disabled={!!error}
                        onClick={login}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                    >
                        Done!
                    </Button>
                </Grid>
            </Grid>
        );
    }

    return (
        <Grid container className={classes.environmentSection}>
            <Grid item xs={12}>
                <BunqQrCode setBunqApiKey={setBunqApiKeyField} />
            </Grid>
            <Grid item xs={12}>
                <TextField className={classes.textField} label="Api key" value={bunqApiKey} onChange={setBunqKeyCb} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    className={classes.textField}
                    label="Device name"
                    value={deviceName}
                    onChange={setDeviceNameCb}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    disabled={!!error || !bunqApiKey}
                    onClick={login}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                >
                    Login with bunq
                </Button>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(SetBunqKeySection);
