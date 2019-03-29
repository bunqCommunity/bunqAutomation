import { useDispatch } from "redux-react-hook";

const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

const useUser = () => {
    const dispatch = useDispatch();

    const getUser = (forceUpdate = false) => {
        userIsLoading();

        window.apiClient
            .get(`${apiBaseUrl}/bunq/user?forceUpdate=${forceUpdate}`)
            .then(data => {
                setUser(data.user ? data.user : false);
                userIsNotLoading();
            })
            .catch(error => {
                console.error(error);
                userIsNotLoading();
            });
    };

    const setUser = user => {
        dispatch({
            type: "USER_SET_INFO",
            payload: {
                user
            }
        });
    };

    const userIsLoading = () => {
        dispatch({ type: "USER_LOADING" });
    };
    const userIsNotLoading = () => {
        dispatch({ type: "USER_NOT_LOADING" });
    };

    const logout = () => {
        dispatch({ type: "USER_LOGOUT" });
    };

    return {
        getUser,
        userIsLoading,
        userIsNotLoading,
        logout
    };
};

export default useUser;
