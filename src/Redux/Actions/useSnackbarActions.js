import { useDispatch } from "redux-react-hook";

const useSnackbarActions = () => {
    const dispatch = useDispatch();

    const openSnackbar = (message, duration = 5000) => {
        dispatch({ type: "SNACKBAR_OPEN", payload: { message, duration } });
    };

    const closeSnackbar = () => {
        dispatch({ type: "SNACKBAR_CLOSE" });
    };

    return {
        closeSnackbar,
        openSnackbar
    };
};

export default useSnackbarActions;
