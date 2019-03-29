import axios from "axios";

const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

class ApiClient {
    constructor() {
        this.apiKey = false;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    async request(url, method, body = {}, headers = {}) {
        if (this.apiKey) {
            headers["x-bunq-automation-authorization"] = this.apiKey;
        }

        if (url[0] === "/") url = `${apiBaseUrl}${url}`;

        const requestConfig = {
            method: method,
            url: url,
            headers: headers
        };

        if (Object.keys(body).length > 0) {
            requestConfig.body = body;
        }

        return axios(requestConfig).then(response => response.data);
    }

    async get(url, headers = {}) {
        return this.request(url, "GET", {}, headers);
    }

    async post(url, body = {}, headers = {}) {
        return this.request(url, "POST", body, headers);
    }

    async put(url, body = {}, headers = {}) {
        return this.request(url, "PUT", body, headers);
    }
}

export default ApiClient;
