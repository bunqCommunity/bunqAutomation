import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useMappedState } from "redux-react-hook";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./Test.scss";

import useInterval from "../../Hooks/useInterval";
import useServerStatus from "../../Redux/Actions/useServerStatus";
import useAuthentication from "../../Redux/Actions/useAuthentication";
const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading,
    serverStatus: state.server_status.status
});

const Test = () => {
    const { checkServerStatus } = useServerStatus();
    const { api_key, loading, serverStatus } = useMappedState(mapState);
    const { loginWithPassword, setBunqApiKey, setApiKey, logout } = useAuthentication();

    // input fields
    const [password, setPassword] = useState("testpassword1234");
    const [bunqApiKey, setBunqApiKeyValue] = useState(
        "sandbox_42926349b753db70cf3620192b5f618b3e7d86753a33b5e9f9719c1f"
    );
    const [environment, setEnvironment] = useState("SANDBOX");

    // check once on-load
    useEffect(() => checkServerStatus(), []);
    // keep checkong on interval
    useInterval(checkServerStatus, 15000);

    return (
        <div className="test">
            <Helmet title="bunqAutomation - Test" />

            <Paper className="content">
                {loading ? "Loading!" : "Not loading"}
                <br />
                Server status {serverStatus}
                <br />
                <TextField
                    label="Password"
                    className="text-field"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={() => loginWithPassword(password)}>
                    Set password
                </Button>
                <TextField
                    label="API key for bunqAutomation"
                    className="text-field"
                    value={api_key}
                    onChange={e => setApiKey(e.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={!api_key}
                    onClick={() => {
                        setBunqApiKey(bunqApiKey, environment);
                    }}
                >
                    Set bunq key
                </Button>
                <br />
                <TextField
                    label="bunq API key"
                    className="text-field"
                    value={bunqApiKey}
                    onChange={e => setBunqApiKeyValue(e.target.value)}
                />
                <TextField
                    label="bunq Environment"
                    className="text-field"
                    value={environment}
                    onChange={e => setEnvironment(e.target.value)}
                />
                <br />
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            </Paper>
        </div>
    );
};

export default Test;
