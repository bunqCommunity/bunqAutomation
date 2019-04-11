import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { useMappedState } from "redux-react-hook";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import useThemeActions from "../../Redux/Actions/useThemeActions";

const styles = theme => ({
    gridItem: {
        textAlign: "left"
    },
    gridItemRight: {
        textAlign: "right"
    },
    button: {
        marginTop: 16
    }
});

const mapState = state => ({
    particles: state.theme.particles
});

const SetSettingsSection = ({ classes }) => {
    const { particles } = useMappedState(mapState);
    const { toggleParticles } = useThemeActions();

    return (
        <Grid container alignContent="flex-start">
            <Grid item xs={12} className={classes.gridItem}>
                <FormControlLabel
                    control={<Switch checked={particles} onChange={toggleParticles} color="primary" />}
                    label="Display background particles"
                />
            </Grid>

            <Grid item xs={12} className={classes.gridItemRight}>
                <Button className={classes.button} component={NavLink} to="/" variant="contained" color="primary">
                    Get started
                </Button>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(SetSettingsSection);
