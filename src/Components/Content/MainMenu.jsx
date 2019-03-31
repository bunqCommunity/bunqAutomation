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
                <ListItem button to="/" component={NavLink}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem className={classes.listFiller} />

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
