import React from "react";
import classNames from "classnames";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";
import IconButton from "@material-ui/core/IconButton";

import WbSunnyIcon from "@material-ui/icons/WbSunny";
import MoonIcon from "../Icons/Moon";

import useTheme from "../../Redux/Actions/useTheme";

const styles = theme => {
    console.log(theme);
    return {
        root: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        },
        themeButton: {
            position: "absolute",
            top: 12,
            right: 12,
            color: theme.palette.type === "dark" ? "white" : "black"
        },
        minimalContent: {
            width: 280,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    };
};

const mapState = state => ({
    darkMode: state.theme.darkMode
});

const MinimalContent = ({ classes, children, className = "", title = "bunqAutomation" }) => {
    const { toggleTheme } = useTheme();
    const { darkMode } = useMappedState(mapState);

    return (
        <div className={classNames(classes.root, className)}>
            <Helmet title={title} />

            <IconButton className={classes.themeButton} onClick={toggleTheme}>
                {darkMode ? <MoonIcon /> : <WbSunnyIcon />}
            </IconButton>

            <div className={classes.minimalContent}>{children}</div>
        </div>
    );
};

export default withStyles(styles)(MinimalContent);
