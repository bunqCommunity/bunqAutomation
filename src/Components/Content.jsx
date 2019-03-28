import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MainMenu from "./MainMenu";

import useStoredBoolean from "../Hooks/useStoredBoolean";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
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
    appBarSpacer: theme.mixins.toolbar,
    menuButton: {
        marginLeft: 12,
        marginRight: 36
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
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: "100vh",
        overflow: "auto"
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {
        height: 320
    },
    h5: {
        marginBottom: theme.spacing.unit * 2
    }
});

const mapState = state => ({
    loading: state.authentication.loading
});

const Content = ({ classes, children, title = "bunqAutomation" }) => {
    const [menuOpen, toggleMenu] = useStoredBoolean("main-menu");
    const { loading } = useMappedState(mapState);

    return (
        <div className={classes.root}>
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

                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <MainMenu open={menuOpen} toggleMenu={toggleMenu} />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />

                {children}
            </main>
        </div>
    );
};

export default withStyles(styles)(Content);
