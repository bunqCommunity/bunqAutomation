import React from "react";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";

import "./App.scss";

import siteConfig from "./Config/site";
import MuiTheme from "./Config/MuiTheme";

import Routes from "./Routes";
import useSnackbar from "./Hooks/useSnackbar";

const theme = createMuiTheme(MuiTheme);

const App = () => {
    const { message, openSnackbar, closeSnackbar } = useSnackbar();
    window.openSnackbar = openSnackbar;

    return (
        <div className="app">
            <BrowserRouter basename={siteConfig.baseName} forceRefresh={false}>
                <MuiThemeProvider theme={theme}>
                    <Routes />

                    <Snackbar
                        autoHideDuration={5000}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={!!message}
                        message={message}
                        onClose={closeSnackbar}
                    />
                </MuiThemeProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
