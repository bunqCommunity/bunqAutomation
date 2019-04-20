import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState, useDispatch } from "redux-react-hook";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Content from "../../Components/Content/Content";
import AvailableActions from "../ActionDetails/AvailableActions";
import ConfiguredActions from "../ActionDetails/ConfiguredActions";

import { loadconfiguredActions, loadAvailable } from "../../Redux/Actions/pipeline";

const styles = theme => ({
    title: {
        marginBottom: 16,
        marginTop: 16
    },
    paper: {
        padding: 8
    }
});

const mapState = state => ({
    pipeline: state.pipeline
});

const ActionOverview = ({ classes }) => {
    const dispatch = useDispatch();
    const { pipeline } = useMappedState(mapState);
    console.log(pipeline);

    useEffect(() => {
        dispatch(loadconfiguredActions());
        dispatch(loadAvailable());
    }, []);

    return (
        <Content title="bunqAutomation - Actions">
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={8}>
                        <Grid item xs={12}>
                            <Typography variant="h5" className={classes.title}>
                                Configured actions
                            </Typography>
                        </Grid>
                        <ConfiguredActions pipeline={pipeline} />

                        <Grid item xs={12}>
                            <Typography variant="h5" className={classes.title}>
                                Available actions
                            </Typography>
                        </Grid>
                        <AvailableActions pipeline={pipeline} />
                    </Grid>
                </Grid>
            </Grid>
        </Content>
    );
};

export default withStyles(styles)(ActionOverview);
