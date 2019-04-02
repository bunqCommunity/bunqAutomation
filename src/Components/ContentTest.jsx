import React from "react";

import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

import HomeIcon from "@material-ui/icons/Home";

const styles = {
    paper: {
        marginTop: 8,
        padding: 8
    },
    full: {
        width: "100%",
        marginTop: 8
    },
    btn: {
        marginTop: 8
    }
};

export default props => {
    return (
        <Paper style={styles.paper} {...props}>
            <TextField style={styles.full} value="Some error field" helperText="Helper text label" error={true} />
            <TextField style={styles.full} value="Some text" />

            <Button style={styles.full} variant="contained">
                Button
            </Button>
            <Button style={styles.full} variant="contained" color="primary">
                Button primary
            </Button>
            <Button style={styles.full} variant="contained" color="secondary">
                Button secondary
            </Button>

            <Button style={styles.full} variant="outlined">
                Button
            </Button>
            <Button style={styles.full} variant="outlined" color="primary">
                Button primary
            </Button>
            <Button style={styles.full} variant="outlined" color="secondary">
                Button secondary
            </Button>

            {/*<Fab />*/}
            <IconButton style={styles.btn}>
                <HomeIcon />
            </IconButton>
            <IconButton style={styles.btn} color="primary">
                <HomeIcon />
            </IconButton>
            <IconButton style={styles.btn} color="secondary">
                <HomeIcon />
            </IconButton>
        </Paper>
    );
};
