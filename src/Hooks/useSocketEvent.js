import { useEffect } from "react";

export default (eventName, callback) => {
    const socket = window.socket;

    useEffect(() => {
        if (socket) socket.on(eventName, callback);
        return () => {
            if (socket) socket.removeListener(eventName, callback);
        };
    }, [eventName]);
};
