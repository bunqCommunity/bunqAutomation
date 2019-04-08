import React, { useEffect } from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LoginIcon from "../Icons/LoginVariant";
import MoonIcon from "../Icons/Moon";
import ServerIcon from "../Icons/Server";

import ReactParticles from "../ReactParticles";
import BunqImage from "../BunqImage";

import useTheme from "../../Redux/Actions/useTheme";
import useUser from "../../Redux/Actions/useUser";

import { getUserImageUuid } from "../../Functions/ApiDataUtils";
import ErrorBoundary from "../ErrorBoundary";

const styles = theme => ({
    root: {
        display: "flex",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    rootTop: {
        paddingTop: 16,
        alignItems: "start"
    },
    minimalContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    },
    serverStatus: {},
    topContent: {
        top: 16,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    topRightContent: {
        right: 16
    },
    topLeftContent: {
        left: 16
    },
    topContentButton: {
        color: theme.palette.type === "dark" ? "white" : "black"
    }
});

const mapState = state => ({
    darkMode: state.theme.darkMode,
    particles: state.theme.particles,

    user: state.user.user,
    userLoading: state.user.loading,

    apiKey: state.authentication.api_key,

    serverStatus: state.server_status.status
});

const MinimalContent = ({ alignTop = false, classes, children, className = "", title = "bunqAutomation" }) => {
    const { darkMode, particles, serverStatus, user, userLoading, apiKey } = useMappedState(mapState);
    const { toggleTheme } = useTheme();
    const { getUser } = useUser();

    useEffect(
        () => {
            if (!userLoading && !user && apiKey && serverStatus === "STATUS_API_READY") {
                getUser();
            }
        },
        [user, apiKey, serverStatus]
    );

    let serverStatusText = "";
    let hoverText = "";
    let statusColor = "default";
    switch (serverStatus) {
        case "STATUS_FIRST_INSTALL":
            serverStatusText = "Requires setup";
            hoverText = "This is the first time you are running bunqAutomation, setup is required";
            break;
        case "STATUS_UNINITIALIZED":
            serverStatusText = "Uninitialized";
            hoverText = "The server has restarted, enter the password to start it";
            break;
        case "STATUS_PASSWORD_READY":
            serverStatusText = "Authenticated";
            hoverText = "The server is set-up but no bunq API key is available yet";
            break;
        case "STATUS_API_READY":
            serverStatusText = "Connected";
            hoverText = "bunqAutomation is ready and active";
            statusColor = "primary";
            break;
        default:
            serverStatusText = "Disconnected";
            statusColor = "secondary";
            break;
    }

    let userButtonContent = <LoginIcon />;
    if (user) {
        const imageUuid = getUserImageUuid(user);
        userButtonContent = <BunqImage imageUuid={imageUuid} />;
    }

    return (
        <ErrorBoundary>
            <div className={classNames(classes.root, className, alignTop && classes.rootTop)}>
                <Helmet title={title} />

                {darkMode && particles && (
                    <ReactParticles
                        style={{
                            position: "absolute",
                            zIndex: 0,
                            height: "100vh",
                            width: "100vw",
                            top: 0,
                            left: 0
                        }}
                    />
                )}

                <div className={classNames(classes.topContent, classes.topLeftContent)}>
                    <Tooltip title={hoverText} aria-label="Displays the current server status">
                        <Chip
                            className={classes.serverStatus}
                            avatar={
                                <Avatar>
                                    <ServerIcon />
                                </Avatar>
                            }
                            color={statusColor}
                            label={serverStatusText}
                        />
                    </Tooltip>
                </div>

                <div className={classNames(classes.topContent, classes.topRightContent)}>
                    <Tooltip title="Toggle themes" aria-label="Toggle between light and dark theme">
                        <IconButton className={classes.topContentButton} onClick={toggleTheme}>
                            {darkMode ? <MoonIcon /> : <WbSunnyIcon />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={user ? "Go home" : "Log in"} aria-label="Go home or log in">
                        <IconButton className={classes.topContentButton} component={NavLink} to={user ? "/" : "/login"}>
                            {userButtonContent}
                        </IconButton>
                    </Tooltip>
                </div>

                <div className={classes.minimalContent}>
                    <ErrorBoundary>{children}</ErrorBoundary>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default withStyles(styles)(MinimalContent);
