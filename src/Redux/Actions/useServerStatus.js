import axios from "axios";
import { useDispatch } from "redux-react-hook";

const useServerStatus = () => {
    const dispatch = useDispatch();

    const checkServerStatus = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/health`)
            .then(response => response.data)
            .then(data => {
                setServerStatus(data.status);
            })
            .catch(console.error);
    };

    const setServerStatus = status => {
        dispatch({
            type: "SERVER_STATUS_SET_STATUS",
            payload: {
                status
            }
        });
    };

    return {
        checkServerStatus
    };
};

export default useServerStatus;
