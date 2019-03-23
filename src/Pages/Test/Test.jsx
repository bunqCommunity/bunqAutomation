import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import "./Test.scss";

const Test = () => {
    const [password, setPassword] = useState("testpassword1234");
    const [apiKey, setApiKey] = useState(false);
    const [bunqApiKey, setBunqApiKey] = useState("sandbox_42926349b753db70cf3620192b5f618b3e7d86753a33b5e9f9719c1f");
    const [environment, setEnvironment] = useState("SANDBOX");

    return (
        <div className="test">
            <Helmet title="bunqAutomation - Test" />

            <Paper className="content">
                <TextField
                    label="Password"
                    className="text-field"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        axios
                            .post("http://bunq-automation.local.test/api/setup/password", {
                                password: password
                            })
                            .then(response => response.data)
                            .then(data => {
                                setApiKey(data.api_key);
                            });
                    }}
                >
                    Set password
                </Button>

                <TextField
                    label="API key for bunqAutomation"
                    className="text-field"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={!apiKey}
                    onClick={() => {
                        axios.post(
                            "http://bunq-automation.local.test/api/setup/api-key",
                            {
                                api_key: bunqApiKey,
                                environment: environment
                            },
                            {
                                headers: {
                                    "X-Bunq-Automation-Key": apiKey
                                }
                            }
                        );
                    }}
                >
                    Set bunq key
                </Button>
                <br />
                <TextField
                    label="bunq API key"
                    className="text-field"
                    value={bunqApiKey}
                    onChange={e => setBunqApiKey(e.target.value)}
                />
                <TextField
                    label="bunq Environment"
                    className="text-field"
                    value={environment}
                    onChange={e => setEnvironment(e.target.value)}
                />
            </Paper>
        </div>
    );
};

export default Test;
