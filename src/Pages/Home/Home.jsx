import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import Typography from "@material-ui/core/Typography"

import "./Home.scss";
import Content from "../../Components/Content";

const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading
});

const Home = () => {
    const { api_key, loading } = useMappedState(mapState);

    if (!api_key && !loading) return <Redirect to="/login" />;

    return (
        <Content title="bunqAutomation - Home">
            <Helmet title="bunqAutomation - Home" />

            <Typography>Home</Typography>
        </Content>
    );
};

export default Home;
