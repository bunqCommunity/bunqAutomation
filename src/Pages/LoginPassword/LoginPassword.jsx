import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import logo from "../../Images/logo-256.png";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";

import useAuthentication from "../../Redux/Actions/useAuthentication";

const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading,
    serverStatus: state.server_status.status
});

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

const LoginPassword = ({ classes }) => {
    const { api_key, loading, serverStatus } = useMappedState(mapState);
    const { loginWithPassword } = useAuthentication();

    const [password, setPassword] = useState("testpassword1234");

    if (api_key && !loading) return <Redirect to="/" />;
    if (serverStatus === "STATUS_FIRST_INSTALL") return <Redirect to="/setup" />;

    return (
        <MinimalContent title="bunqAutomation - Login">
            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={logo} />
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
                    disabled={!password || password.length < 8}
                    onClick={e => loginWithPassword(password)}
                >
                    Login
                </Button>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(LoginPassword);
