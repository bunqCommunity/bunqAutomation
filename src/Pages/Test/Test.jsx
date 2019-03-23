import React, { useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Test = () => {
    const [password, setPassword] = useState("testpassword1234");
    const [apiKey, setApiKey] = useState(false);

    return (
        <div className="home">
            <Helmet title="bunqAutomation - Home" />

            <Button
                variant="contained"
                onClick={() => {
                    axios
                        .post("http://bunq-automation.local.test/api/setup/password", {
                            password: password
                        })
                        .then(response => response.data)
                        .then(data => {});
                }}
            >
                Set password
            </Button>
            <TextField value={password} onChange={e => setPassword(e.target.value)} />

            <br />
            <br />
            <Button
                variant="contained"
                onClick={() => {
                    axios.post(
                        "http://bunq-automation.local.test/api/setup/api-key",
                        {
                            datakey: "datavalue"
                        },
                        {
                            headers: {
                                "X-Bunq-Automation-Key": "api key"
                            }
                        }
                    );
                }}
            >
                Set bunq key
            </Button>
        </div>
    );
};

export default Test;
