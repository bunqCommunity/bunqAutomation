import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import ThemedLogo from "../../Components/ThemedLogo";

import useAuthentication from "../../Redux/Actions/useAuthentication";

const styles = theme => ({
    root: {
        width: 280,
        textAlign: "center"
    },
    image: {
        width: "60%"
    },
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginBottom: 8
    }
});

const mapState = state => ({
    darkMode: state.theme.darkMode,

    apiKey: state.authentication.api_key,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

const LoginPassword = ({ classes }) => {
    const { darkMode, serverStatus, serverStatusChecked, apiKey } = useMappedState(mapState);
    const { loginWithPassword } = useAuthentication();

    const [password, setPassword] = useState("testpassword1234");

    const themedLogo = ThemedLogo(darkMode);

    if (serverStatusChecked && serverStatus === "STATUS_FIRST_INSTALL") {
        return <Redirect to="/setup" />;
    }

    console.log(serverStatusChecked, apiKey, serverStatus);
    if (serverStatusChecked && apiKey && serverStatus === "STATUS_API_READY") {
        console.log(true);
        return <Redirect to="/" />;
    }

    return (
        <MinimalContent title="bunqAutomation - Login">
            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={themedLogo} />
                <TextField
                    className={classes.textField}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!password || password.length < 8 || serverStatus === "DISCONNECTED"}
                    onClick={e => loginWithPassword(password)}
                >
                    Login
                </Button>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(LoginPassword);
