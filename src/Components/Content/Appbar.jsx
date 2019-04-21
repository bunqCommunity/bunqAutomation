import React, { useEffect } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState, useDispatch } from "redux-react-hook";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import LinearProgress from "@material-ui/core/LinearProgress";

import MenuIcon from "@material-ui/icons/Menu";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import MoonIcon from "../Icons/Moon";

import UserBunqImage from "../AvatarBunqImage";

import { toggleTheme } from "../../Redux/Actions/theme";
import { logout as logoutAuth } from "../../Redux/Actions/authentication";

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
    linearColorPrimary: {
        backgroundColor: "rgb(60,150,133)"
    },
    linearBarColorPrimary: {
        backgroundColor: "#00695c"
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 24
    },
    themeButton: {
        marginRight: 8
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
        height: 44,
        width: 44
    }
});

const mapState = state => ({
    user: state.user.user,

    userLoading: state.user.loading,
    authenticationLoading: state.authentication.loading,
    bunqApiKeysLoading: state.bunq_api_keys.loading,

    serverStatusChecked: state.server_status.checked,
    serverStatus: state.server_status.status,

    darkMode: state.theme.darkMode
});

const Appbar = ({ title, classes, menuOpen, toggleMenu }) => {
    const dispatch = useDispatch();
    const state = useMappedState(mapState);

    const logout = () => dispatch(logoutAuth());

    useEffect(() => {
        if (state.serverStatusChecked && state.serverStatus === "STATUS_UNINITIALIZED") {
            logout();
        }
    }, [state.serverStatusChecked, state.serverStatus]);

    let userComponent = <UserBunqImage className={classes.userImage} object={state.user} />;
    const hasNotifications = false;
    if (hasNotifications) {
        userComponent = (
            <Badge badgeContent={4} color="secondary">
                {userComponent}
            </Badge>
        );
    }

    const isLoading = state.userLoading || state.authenticationLoading || state.bunqApiKeysLoading;

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

                <IconButton className={classes.themeButton} color="inherit" onClick={() => dispatch(toggleTheme())}>
                    {state.darkMode ? <MoonIcon /> : <WbSunnyIcon />}
                </IconButton>
                {userComponent}
            </Toolbar>

            {isLoading && (
                <LinearProgress
                    classes={{
                        colorPrimary: classes.linearColorPrimary,
                        barColorPrimary: classes.linearBarColorPrimary
                    }}
                    color="primary"
                />
            )}
        </AppBar>
    );
};

export default withStyles(styles)(Appbar);
