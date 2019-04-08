import React, { useEffect } from "react";
import { useMappedState } from "redux-react-hook";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";

import MuiTheme from "./Config/MuiTheme";

import Snackbar from "./Components/Snackbar";
import Routes from "./Routes";

import useServerStatus from "./Redux/Actions/useServerStatus";
import useAuthentication from "./Redux/Actions/useAuthentication";
import useSocketEvent from "./Hooks/useSocketEvent";

const lightTheme = createMuiTheme(MuiTheme.light);
const darkTheme = createMuiTheme(MuiTheme.dark);

const mapState = state => ({
    darkMode: state.theme.darkMode,

    apiKey: state.authentication.api_key
});

const RoutesWrapper = () => {
    const socket = window.socket;
    const { darkMode, apiKey } = useMappedState(mapState);
    const { setServerStatus } = useServerStatus();
    const { validateApiKey } = useAuthentication();

    useEffect(() => {
        if (socket) socket.emit("status");
        validateApiKey(apiKey);
    }, []);

    // check server status
    useSocketEvent("disconnect", () => setServerStatus("DISCONNECTED"));
    useSocketEvent("status", status => setServerStatus(status));

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
