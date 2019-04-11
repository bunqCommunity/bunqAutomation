export const updateUser = (forceUpdate = false) => {
    return dispatch => {
        dispatch(userIsLoading());

        window.apiClient
            .get(`/bunq/:key/user?forceUpdate=${forceUpdate}`)
            .then(data => {
                dispatch(setUser(data.user ? data.user : false));
                dispatch(userIsNotLoading());
            })
            .catch(error => {
                console.error(error);
                dispatch(userIsNotLoading());
            });
    };
};

export const setUser = user => ({
    type: "USER_SET_INFO",
    payload: {
        user
    }
});

export const userIsLoading = () => ({ type: "USER_LOADING" });

export const userIsNotLoading = () => ({ type: "USER_NOT_LOADING" });
