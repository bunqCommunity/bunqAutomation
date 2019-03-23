import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";

import "./Home.scss";

const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading
});

const Home = () => {
    const { api_key, loading } = useMappedState(mapState);

    if (!api_key && !loading) return <Redirect to="/login" />;

    return (
        <div className="home">
            <Helmet title="bunqAutomation - Home" />
            Homepage
        </div>
    );
};

export default Home;
