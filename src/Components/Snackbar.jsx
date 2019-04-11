import React from "react";
import { useMappedState } from "redux-react-hook";
import Snackbar from "@material-ui/core/Snackbar";

import useSnackbarActions from "../Redux/Actions/useSnackbarActions";

const mapState = state => ({
    snackbar: state.snackbar
});

const SnackbarComponent = () => {
    const { snackbar } = useMappedState(mapState);
    const { openSnackbar, closeSnackbar } = useSnackbarActions();
    window.openSnackbar = openSnackbar;

    return (
        <Snackbar
            autoHideDuration={snackbar.duration}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            open={snackbar.open}
            message={snackbar.message}
            onClose={closeSnackbar}
        />
    );
};

export default SnackbarComponent;
