import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./NotFound.scss";

import logo from "../../Images/logo-256.png";

const NotFound = () => {
    return (
        <div className="notfound">
            <Helmet title="bunqAutomation - 404" />

            <div className="content">
                <img className="image" alt="bunqAutomation logo" src={logo} />

                <Typography variant="h5">Page not found</Typography>

                <br />
                <Button component={NavLink} to="/" variant="contained">
                    Go home?
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
