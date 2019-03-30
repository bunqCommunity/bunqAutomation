import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import logo from "../../Images/logo-256.png";
import MinimalContent from "../../Components/MinimalContent/MinimalContent";

const NotFound = () => {
    return (
        <MinimalContent title="bunqAutomation - Login">
            <Helmet title="bunqAutomation - 404" />

            <div className="content">
                <img className="image" alt="bunqAutomation logo" src={logo} />

                <Typography variant="h5">Page not found</Typography>

                <br />
                <Button component={NavLink} to="/" variant="contained">
                    Go home?
                </Button>
            </div>
        </MinimalContent>
    );
};

export default NotFound;
