import React, { useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import MuiTheme from "./Config/MuiTheme";

import Snackbar from "./Components/Snackbar";
import Routes from "./Routes";

import { setServerStatus } from "./Redux/Actions/server_status";
import { validateApiKey } from "./Redux/Actions/authentication";
import useSocketEvent from "./Hooks/useSocketEvent";

const lightTheme = createMuiTheme(MuiTheme.light);
const darkTheme = createMuiTheme(MuiTheme.dark);

const mapState = state => ({
    darkMode: state.theme.darkMode,

    apiKey: state.authentication.api_key
});

const RoutesWrapper = () => {
    const socket = window.socket;
    const dispatch = useDispatch();
    const { darkMode, apiKey } = useMappedState(mapState);

    const setStatus = status => dispatch(setServerStatus(status));

    useEffect(() => {
        // request status update
        if (socket) socket.emit("status");

        // validate our api key
        dispatch(validateApiKey(apiKey));
    }, []);

    // check server status
    useSocketEvent("disconnect", () => setStatus("DISCONNECTED"));
    useSocketEvent("status", status => setStatus(status));

    const selectedTheme = darkMode ? darkTheme : lightTheme;

    return (
        <MuiThemeProvider theme={selectedTheme}>
            <CssBaseline>
                <div
                    className={`app ${darkMode ? "dark" : "light"}disabled`}
                    style={{
                        backgroundColor: selectedTheme.palette.background.default
                    }}
                >
                    <Routes />

                    <Snackbar />
                </div>
            </CssBaseline>
        </MuiThemeProvider>
    );
};

export default RoutesWrapper;
