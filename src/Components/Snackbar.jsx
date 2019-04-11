import React from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import Snackbar from "@material-ui/core/Snackbar";

import { closeSnackbar } from "../Redux/Actions/snackbar";

const mapState = state => ({
    snackbar: state.snackbar
});

const SnackbarComponent = () => {
    const dispatch = useDispatch();
    const { snackbar } = useMappedState(mapState);

    return (
        <Snackbar
            autoHideDuration={snackbar.duration}
            message={snackbar.message}
            open={snackbar.open}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            onClose={() => dispatch(closeSnackbar())}
        />
    );
};

export default SnackbarComponent;
