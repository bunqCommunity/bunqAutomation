export default error => {
    if (!error.response) return error.message;

    if (error.response.data) return error.response.data;

    return error;
};
