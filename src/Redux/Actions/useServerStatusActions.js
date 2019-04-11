import { useDispatch } from "redux-react-hook";

const useServerStatusActions = () => {
    const dispatch = useDispatch();

    const setServerStatus = status => {
        dispatch({
            type: "SERVER_STATUS_SET_STATUS",
            payload: {
                status
            }
        });
    };

    return {
        setServerStatus
    };
};

export default useServerStatusActions;
