import React from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import MoonIcon from "../Icons/Moon";
import ServerIcon from "../Icons/Server";

import useTheme from "../../Redux/Actions/useTheme";
import ReactParticles from "../ReactParticles";

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
    themeButton: {
        position: "absolute",
        top: 8,
        right: 8,
        color: theme.palette.type === "dark" ? "white" : "black"
    },
    serverStatus: {
        position: "absolute",
        top: 16,
        left: 16
    },
    minimalContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    }
});

const mapState = state => ({
    darkMode: state.theme.darkMode,
    serverStatus: state.server_status.status
});

const MinimalContent = ({ alignTop = false, classes, children, className = "", title = "bunqAutomation" }) => {
    const { toggleTheme } = useTheme();
    const { darkMode, serverStatus } = useMappedState(mapState);

    let serverStatusText = "";
    let statusColor = "default";
    switch (serverStatus) {
        case "STATUS_FIRST_INSTALL":
            serverStatusText = "Requires setup";
            break;
        case "STATUS_UNINITIALIZED":
            serverStatusText = "Waiting for bunq";
            break;
        case "STATUS_PASSWORD_READY":
            serverStatusText = "Waiting for password";
            break;
        case "STATUS_API_READY":
            serverStatusText = "Connected";
            statusColor = "primary";
            break;
        default:
            serverStatusText = "Disconnected";
            statusColor = "secondary";
            break;
    }

    return (
        <div className={classNames(classes.root, className, alignTop && classes.rootTop)}>
            <Helmet title={title} />

            {darkMode && (
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

            <Tooltip title="Toggle themes" aria-label="Toggle between light and dark theme">
                <IconButton className={classes.themeButton} onClick={toggleTheme}>
                    {darkMode ? <MoonIcon /> : <WbSunnyIcon />}
                </IconButton>
            </Tooltip>

            <Tooltip title="The server status" aria-label="Displays the current server status">
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

            <div className={classes.minimalContent}>{children}</div>
        </div>
    );
};

export default withStyles(styles)(MinimalContent);
