import React, { useEffect } from "react";
import { useMappedState } from "redux-react-hook";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import MuiTheme from "./Config/MuiTheme";

import Snackbar from "./Components/Snackbar";
import Routes from "./Routes";

import useAuthentication from "./Redux/Actions/useAuthentication";
import useServerStatus from "./Redux/Actions/useServerStatus";

import useSocketEvent from "./Hooks/useSocketEvent";
import useInterval from "./Hooks/useInterval";


const mapState = state => ({
    darkMode: state.theme.darkMode
});

const RoutesWrapper = () => {
    const socket = window.socket;
    const { darkMode } = useMappedState(mapState);
    const { loadStoredApiKey } = useAuthentication();
    const { setServerStatus } = useServerStatus();

    useSocketEvent("disconnect", () => setServerStatus("DISCONNECTED"));

    // check server status
    useSocketEvent("connect", () => socket.emit("status"));
    useSocketEvent("status", status => setServerStatus(status));
    useInterval(() => socket.emit("status"), 5000);

    // initial api key load from storage
    useEffect(() => loadStoredApiKey(), []);

    const lightTheme = createMuiTheme(MuiTheme.light);
    const darkTheme = createMuiTheme(MuiTheme.dark);

    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />

            <div className={`app ${darkMode ? "dark" : "light"}`}>
                <Routes />

                <Snackbar />
            </div>
        </MuiThemeProvider>
    );
};

export default RoutesWrapper;
