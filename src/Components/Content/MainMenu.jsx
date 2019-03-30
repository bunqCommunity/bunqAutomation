import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import ListItemIcon from "@material-ui/core/ListItemIcon/index";
import Divider from "@material-ui/core/Divider/index";
import IconButton from "@material-ui/core/IconButton/index";
import Drawer from "@material-ui/core/Drawer/index";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";

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
    }
});

const MainMenu = ({ classes, open, toggleMenu }) => {
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
            <List>
                <ListItem button to="/" component={NavLink}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default withStyles(styles)(MainMenu);
