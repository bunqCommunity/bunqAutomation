import axios from "axios/index";

export const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

class ApiClient {
    constructor() {
        this.apiKey = false;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    async request(url, method, data = {}, headers = {}) {
        if (this.apiKey) {
            headers["x-bunq-automation-authorization"] = this.apiKey;
        }

        if (url[0] === "/") url = `${apiBaseUrl}${url}`;

        const requestConfig = {
            method: method,
            url: url,
            headers: headers
        };

        if (Object.keys(data).length > 0) {
            requestConfig.data = data;
        }

        return axios(requestConfig).then(response => response.data);
    }

    async get(url, headers = {}) {
        return this.request(url, "GET", {}, headers);
    }

    async post(url, data = {}, headers = {}) {
        return this.request(url, "POST", data, headers);
    }

    async put(url, data = {}, headers = {}) {
        return this.request(url, "PUT", data, headers);
    }
}

export default ApiClient;
