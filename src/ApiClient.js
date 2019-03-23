import axios from "axios";

class ApiClient {
    constructor() {}

    async get(...params) {
        return axios.get(...params);
    }
    async post(...params) {
        return axios.get(...params);
    }
    async put(...params) {
        return axios.get(...params);
    }
}

export default ApiClient;
