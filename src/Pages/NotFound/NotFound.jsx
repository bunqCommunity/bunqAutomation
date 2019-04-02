import React from "react";
import { NavLink } from "react-router-dom";
import { useMappedState } from "redux-react-hook";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import MinimalContent from "../../Components/MinimalContent/MinimalContent";
import ThemedLogo from "../../Components/ThemedLogo";

const styles = theme => ({
    root: {
        width: 280,
        textAlign: "center"
    },
    image: {
        width: "60%"
    },
    textField: {
        width: "100%",
        marginBottom: 8
    },
    button: {
        width: "100%",
        marginBottom: 8
    }
});

const mapState = state => ({
    darkMode: state.theme.darkMode
});

const NotFound = ({ classes }) => {
    const { darkMode } = useMappedState(mapState);
    const themedLogo = ThemedLogo(darkMode);

    return (
        <MinimalContent title="bunqAutomation - 404">
            <div className={classes.root}>
                <img className={classes.image} alt="bunqAutomation logo" src={themedLogo} />

                <Typography variant="h5">Page not found</Typography>

                <br />
                <Button component={NavLink} to="/">
                    Go home
                </Button>
            </div>
        </MinimalContent>
    );
};

export default withStyles(styles)(NotFound);
