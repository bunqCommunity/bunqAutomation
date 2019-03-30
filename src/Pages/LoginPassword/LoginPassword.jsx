import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import "./LoginPassword.scss";
import logo from "../../Images/logo-256.png";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import MoonIcon from "../../Components/Icons/Moon";

import useServerStatus from "../../Redux/Actions/useServerStatus";
import useAuthentication from "../../Redux/Actions/useAuthentication";
import useTheme from "../../Redux/Actions/useTheme";

import useInterval from "../../Hooks/useInterval";

const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading,

    darkMode: state.theme.darkMode
});

const LoginPassword = () => {
    const { api_key, loading, darkMode } = useMappedState(mapState);
    const { checkServerStatus } = useServerStatus();
    const { loginWithPassword } = useAuthentication();
    const { toggleTheme } = useTheme();

    const [password, setPassword] = useState("testpassword1234");

    // continue checking if the server is ready
    useEffect(() => checkServerStatus(), []);
    useInterval(checkServerStatus, 15000);

    if (api_key && !loading) return <Redirect to="/" />;

    return (
        <div className="login-password">
            <Helmet title="bunqAutomation - Login" />

            <IconButton
                color="inherit"
                className="theme-btn"
                onClick={toggleTheme}
                style={{
                    color: darkMode ? "white" : "black"
                }}
            >
                {darkMode ? <MoonIcon /> : <WbSunnyIcon />}
            </IconButton>

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
