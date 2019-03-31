import React, { useEffect } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import MoonIcon from "../Icons/Moon";

import UserBunqImage from "../UserBunqImage";

import useTheme from "../../Redux/Actions/useTheme";
import useUser from "../../Redux/Actions/useUser";
import useAuthentication from "../../Redux/Actions/useAuthentication";

const drawerWidth = 240;

const styles = theme => ({
    toolbar: {
        paddingLeft: 0,
        paddingRight: 24
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 24
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    titleOpen: {
        paddingLeft: 24
    },
    userImage: {
        height: 44
    }
});

const mapState = state => ({
    user: state.user.user,
    userLoading: state.user.loading,

    authenticationLoading: state.authentication.loading,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status,

    darkMode: state.theme.darkMode
});

const Appbar = ({ title, classes, menuOpen, toggleMenu }) => {
    const state = useMappedState(mapState);
    const { logout } = useAuthentication();
    const { toggleTheme } = useTheme();
    const { getUser } = useUser();

    useEffect(() => {
        if (!state.user && !state.userLoading && !state.authenticationLoading) getUser(true);
    }, []);

    useEffect(() => {
        if (state.serverStatusChecked && state.serverStatus === "STATUS_UNINITIALIZED") logout();
    }, [state.serverStatusChecked, state.serverStatus]);

    let userComponent = <UserBunqImage className={classes.userImage} user={state.user} />;
    const hasNotifications = false;
    if (hasNotifications) {
        userComponent = (
            <Badge badgeContent={4} color="secondary">
                {userComponent}
            </Badge>
        );
    }

    return (
        <AppBar position="absolute" className={classNames(classes.appBar, !menuOpen && classes.appBarShift)}>
            <Toolbar disableGutters={!true} className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={toggleMenu}
                    className={classNames(classes.menuButton, !menuOpen && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    noWrap
                    variant="h6"
                    component="h1"
                    color="inherit"
                    className={classNames(classes.title, !menuOpen && classes.titleOpen)}
                >
                    {title}
                </Typography>

                <IconButton color="inherit" onClick={toggleTheme}>
                    {state.darkMode ? <MoonIcon /> : <WbSunnyIcon />}
                </IconButton>
                {userComponent}
            </Toolbar>
        </AppBar>
    );
};

export default withStyles(styles)(Appbar);
