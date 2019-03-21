import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="notfound">
            <Helmet title="bunqAutomation - 404" />
            Not found! <NavLink to="/">Go home? </NavLink>
        </div>
    );
};

export default NotFound;
