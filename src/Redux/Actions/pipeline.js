export const actionsIsLoading = () => ({ type: "PIPELINE_LOADING" });
export const actionsIsNotLoading = () => ({ type: "PIPELINE_NOT_LOADING" });

export const loadAvailable = () => {
    return dispatch => {
        dispatch(actionsIsLoading());

        window.apiClient
            .get(`/automation/pipeline/available`)
            .then(data => {
                dispatch(setAvailable(data));
                dispatch(actionsIsNotLoading());
            })
            .catch(error => {
                dispatch(actionsIsNotLoading());
            });
    };
};
export const loadconfiguredActions = () => {
    return dispatch => {
        dispatch(actionsIsLoading());

        window.apiClient
            .get(`/automation/pipeline/active`)
            .then(data => {
                dispatch(setconfiguredActions(data));
                dispatch(actionsIsNotLoading());
            })
            .catch(error => {
                dispatch(actionsIsNotLoading());
            });
    };
};

export const setAvailable = available => {
    return {
        type: "PIPELINE_SET_AVAILABLE",
        payload: {
            available
        }
    };
};
export const setconfiguredActions = configuredActions => {
    return {
        type: "PIPELINE_SET_CONFIGURED_ACTIONS",
        payload: {
            configured_actions: configuredActions
        }
    };
};
