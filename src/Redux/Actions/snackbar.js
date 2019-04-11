export const openSnackbar = (message, duration = 5000) => ({
    type: "SNACKBAR_OPEN",
    payload: { message, duration }
});

export const closeSnackbar = () => ({ type: "SNACKBAR_CLOSE" });
