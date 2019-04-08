import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Content from "../../Components/Content/Content";

const Home = () => {
    return (
        <Content title="bunqAutomation - Dashboard">
            <Paper style={{ padding: 12 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Paper>
        </Content>
    );
};

export default Home;
