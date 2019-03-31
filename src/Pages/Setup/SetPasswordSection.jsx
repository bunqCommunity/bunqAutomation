import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import useAuthentication from "../../Redux/Actions/useAuthentication";

const styles = () => ({
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginTop: 8
    }
});

const SetPasswordSection = ({ classes, password, setPassword, passwordConfirm, setPasswordConfirm }) => {
    const { loginWithPassword } = useAuthentication();

    // set a password
    const [error, setError] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");

    useEffect(
        () => {
            if (password && password.length < 8) {
                setError("Password length has to be atleast 7 characters");
            } else {
                setError("");
            }
        },
        [password, passwordConfirm]
    );
    useEffect(
        () => {
            if (passwordConfirm && password !== passwordConfirm) {
                setErrorConfirm("Password do not match");
            } else {
                setErrorConfirm("");
            }
        },
        [password, passwordConfirm]
    );

    const setPasswordCb = e => {
        setPassword(e.target.value);
    };
    const setPasswordConfirmCb = e => {
        setPasswordConfirm(e.target.value);
    };
    const login = () => {
        if (!error) {
            loginWithPassword(password);
        }
    };

    return (
        <React.Fragment>
            <TextField
                autoFocus
                className={classes.textField}
                type="password"
                label="Password"
                error={!!error}
                helperText={error}
                value={password}
                onChange={setPasswordCb}
            />
            <TextField
                className={classes.textField}
                type="password"
                label="Confirm password"
                disabled={!!error || !password}
                error={!!errorConfirm}
                helperText={errorConfirm}
                value={passwordConfirm}
                onChange={setPasswordConfirmCb}
            />
            <Button
                disabled={!!error || !!errorConfirm || !password}
                onClick={login}
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Set password
            </Button>
            <Button className={classes.button} variant="contained" color="secondary">
                Set password
            </Button>
            <TextField
                className={classes.textField}
                type="password"
                label="Error test"
                helperText="Invalid value was given my dude!"
                error={true}
            />
            <br />

            <AppBar>
                <Toolbar>
                    <Typography noWrap variant="h6" component="h1">
                        Test text
                    </Typography>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default withStyles(styles)(SetPasswordSection);
