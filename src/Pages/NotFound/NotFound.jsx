import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import logo from "../../Images/logo-256.png";
import MinimalContent from "../../Components/MinimalContent/MinimalContent";

const styles = theme => ({
    root: {
        width: 280,
        textAlign: "center"
    },
    image: {
        width: "60%"
    },
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginBottom: 8
    }
});

const NotFound = ({ classes }) => {
    return (
        <MinimalContent title="bunqAutomation - Login">
            <Helmet title="bunqAutomation - 404" />

            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={logo} />

                <Typography variant="h5">Page not found</Typography>

                <br />
                <Button component={NavLink} to="/">
                    Go home
                </Button>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(NotFound);
