import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Content from "../../Components/Content/Content";

const Home = () => {
    return (
        <Content title="bunqAutomation - Dashboard">
            <Paper style={{ padding: 12 }}>
                <Typography variant="h5">Dashboard</Typography>

                <Button variant="contained">Default</Button>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
                <Button variant="contained" color="secondary">
                    Secondary
                </Button>

                <br />
                <br />
                <br />
                <Button variant="outlined">Default</Button>
                <Button variant="outlined" color="primary">
                    Primary
                </Button>
                <Button variant="outlined" color="secondary">
                    Secondary
                </Button>
            </Paper>
        </Content>
    );
};

export default Home;
