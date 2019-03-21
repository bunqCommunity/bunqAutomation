import { useState } from "react";

export default () => {
    const [message, setMessage] = useState(false);

    const openSnackbar = message => setMessage(message);
    const closeSnackbar = () => setMessage(false);

    return { message, openSnackbar, closeSnackbar };
};
