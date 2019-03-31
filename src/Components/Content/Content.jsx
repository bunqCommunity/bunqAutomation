import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";

import Appbar from "./Appbar";
import MainMenu from "./MainMenu";

import useStoredBoolean from "../../Hooks/useStoredBoolean";

import useUser from "../../Redux/Actions/useUser";
import useAuthentication from "../../Redux/Actions/useAuthentication";

const styles = theme => ({
    root: {
        display: "flex"
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: "100vh",
        overflow: "auto"
    },
    h5: {
        marginBottom: theme.spacing.unit * 2
    }
});

const mapState = state => ({
    user: state.user.user,
    userLoading: state.user.loading,

    authenticationLoading: state.authentication.loading,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status
});

const Content = ({ classes, children, title = "bunqAutomation" }) => {
    const [menuOpen, toggleMenu] = useStoredBoolean("main-menu");
    const state = useMappedState(mapState);
    const { logout } = useAuthentication();
    const { getUser } = useUser();

    useEffect(() => {
        if (!state.user && !state.userLoading && !state.authenticationLoading) getUser(true);
    }, []);

    useEffect(
        () => {
            if (state.serverStatusChecked && state.serverStatus === "STATUS_UNINITIALIZED") logout();
        },
        [state.serverStatusChecked, state.serverStatus]
    );

    return (
        <div className={classes.root}>
            <Helmet title={title} />

            <Appbar title={title} menuOpen={menuOpen} toggleMenu={toggleMenu} />

            <MainMenu logout={logout} open={menuOpen} toggleMenu={toggleMenu} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                {children}
            </main>
        </div>
    );
};

export default withStyles(styles)(Content);
