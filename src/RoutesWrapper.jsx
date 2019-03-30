import React, { useEffect } from "react";
import io from "socket.io-client";
import { useMappedState } from "redux-react-hook";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import MuiTheme from "./Config/MuiTheme";

import ApiClient from "./Classes/ApiClient";
import Snackbar from "./Components/Snackbar";
import Routes from "./Routes";

import useAuthentication from "./Redux/Actions/useAuthentication";

const lightTheme = createMuiTheme(MuiTheme.light);
const darkTheme = createMuiTheme(MuiTheme.dark);

const mapState = state => ({
    darkMode: state.theme.darkMode
});

const apiClient = new ApiClient();
const socket = io(process.env.REACT_APP_SERVER_URL);

window.apiClient = apiClient;
window.socket = socket;

socket.on("connect", () => {
    console.log("connect");
    socket.emit("status");
});
socket.on("status", data => {
    console.log("status", data);
});

const RoutesWrapper = () => {
    const { darkMode } = useMappedState(mapState);
    const { loadStoredApiKey } = useAuthentication();

    useEffect(() => loadStoredApiKey(), []);

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
