import React from "react";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    button: {
        marginTop: 16
    }
});

const ConfirmDetailsSection = ({ classes }) => {
    return (
        <React.Fragment>
            <Typography>Confirm details</Typography>

            <Button className={classes.button} component={NavLink} to="/" variant="contained" color="primary">
                Get started
            </Button>
        </React.Fragment>
    );
};

export default withStyles(styles)(ConfirmDetailsSection);
