import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PaletteIcon from "@material-ui/icons/Palette";
import KeyIcon from "@material-ui/icons/VpnKey";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

const drawerWidth = 240;

const styles = theme => ({
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: [
            theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        ]
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: [
            theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            })
        ],
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 7
        }
    },
    list: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    listFiller: {
        height: "100%"
    }
});

const StandardMenuItem = ({ to, primary, secondary = "", Icon = null }) => {
    return (
        <ListItem button to={to} component={NavLink}>
            {Icon && (
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
            )}
            <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
    );
};

const MainMenu = ({ classes, open, toggleMenu, logout }) => {
    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, open && classes.drawerPaperClose)
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={toggleMenu}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />

            <List className={classes.list}>
                <StandardMenuItem to="/" primary="Dashboard" Icon={HomeIcon} />
                <StandardMenuItem to="/bunq-api-keys" primary="API keys" Icon={KeyIcon} />

                <ListItem className={classes.listFiller} />

                <StandardMenuItem to="/content-test" primary="Design preview" Icon={PaletteIcon} />
                <StandardMenuItem to="/action-test" primary="Action test" Icon={BubbleChartIcon} />
                <ListItem button onClick={logout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default withStyles(styles)(MainMenu);
