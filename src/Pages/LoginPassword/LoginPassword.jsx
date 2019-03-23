import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useMappedState } from "redux-react-hook";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./LoginPassword.scss";
import logo from "../../Images/logo-256.png";

import useServerStatus from "../../Redux/Actions/useServerStatus";
import useAuthentication from "../../Redux/Actions/useAuthentication";
import useInterval from "../../Hooks/useInterval";
const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading,
    serverStatus: state.server_status.status
});

const LoginPassword = () => {
    const { serverStatus } = useMappedState(mapState);
    const { checkServerStatus } = useServerStatus();
    const { loginWithPassword } = useAuthentication();

    const [password, setPassword] = useState("testpassword1234");

    console.log(serverStatus);

    // check once on-load
    useEffect(() => checkServerStatus(), []);
    // keep checkong on interval
    useInterval(checkServerStatus, 15000);

    return (
        <div className="login-password">
            <Helmet title="bunqAutomation - Login" />

            <div className="content">
                <img className="image" alt="bunqAutomation logo" src={logo} />
                <TextField
                    className="text-field"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    className="button"
                    variant="contained"
                    color="primary"
                    disabled={!password || password.length < 8}
                    onClick={e => loginWithPassword(password)}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default LoginPassword;
