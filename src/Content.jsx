import React, { useEffect } from "react";
import { useMappedState } from "redux-react-hook";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import MuiTheme from "./Config/MuiTheme";

import Routes from "./Routes";
import Snackbar from "./Components/Snackbar";

import useTheme from "./Redux/Actions/useTheme";
import useAuthentication from "./Redux/Actions/useAuthentication";

const lightTheme = createMuiTheme(MuiTheme.light);
const darkTheme = createMuiTheme(MuiTheme.dark);

const mapState = state => ({
    darkMode: state.theme.darkMode
});

const Content = () => {
    const { darkMode } = useMappedState(mapState);
    const { loadStoredApiKey } = useAuthentication();
    const { toggleTheme } = useTheme();
    window.toggleTheme = toggleTheme;

    useEffect(() => loadStoredApiKey(), []);

    return (
        <MuiThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <div className={`app ${darkMode ? "dark" : "light"}`}>
                <Routes />

                <Snackbar />
            </div>
        </MuiThemeProvider>
    );
};

export default Content;
