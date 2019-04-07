import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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

const SetPasswordSection = ({ classes, password, setPassword, passwordConfirm, setPasswordConfirm, serverStatus }) => {
    const { loginWithPassword } = useAuthentication();

    const [error, setError] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");

    const requiresConfirm = serverStatus === "STATUS_FIRST_INSTALL";
    const invalidForm = !!error || !!errorConfirm || !password || (requiresConfirm && !passwordConfirm);

    useEffect(() => {
        if (password && password.length < 8) {
            setError("Password length has to be atleast 7 characters");
        } else {
            setError("");
        }
    }, [password, passwordConfirm]);
    useEffect(() => {
        if (requiresConfirm && passwordConfirm && password !== passwordConfirm) {
            setErrorConfirm("Password do not match");
        } else {
            setErrorConfirm("");
        }
    }, [password, passwordConfirm]);

    const setPasswordCb = e => {
        setPassword(e.target.value);
    };
    const setPasswordConfirmCb = e => {
        setPasswordConfirm(e.target.value);
    };
    const login = () => {
        if (!invalidForm) loginWithPassword(password);
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
            {requiresConfirm && (
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
            )}
            <Button
                disabled={invalidForm}
                onClick={login}
                className={classes.button}
                variant="contained"
                color="primary"
            >
                {requiresConfirm ? "Set password" : "Confirm your password"}
            </Button>
        </React.Fragment>
    );
};

export default withStyles(styles)(SetPasswordSection);
