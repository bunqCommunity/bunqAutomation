import axios from "axios";

export const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

class ApiClient {
    constructor() {
        this.apiKey = false;
        this.selectedBunqApiKey = false;
    }

    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    selectBunqApiKey(identifier) {
        this.selectedBunqApiKey = identifier;
    }

    formatUrl(url, params = {}, options = { inlineKey: false }) {
        if (options.inlineKey) params.api_key = this.apiKey;

        // replace :key with selected bunq key if found
        const replaceKeyPattern = "/bunq/:key/";
        url = url.replace(replaceKeyPattern, `/bunq/${this.selectedBunqApiKey}/`);

        // prepend basename
        if (url[0] === "/") url = `${apiBaseUrl}${url}`;

        // create a query string for the parameters
        if (Object.keys(params).length > 0) {
            const paramString = Object.keys(params)
                .map(paramKey => {
                    const paramValue = params[paramKey];
                    const encodedKey = encodeURIComponent(paramKey);
                    const encodedValue = encodeURIComponent(paramValue);

                    return `${encodedKey}=${encodedValue}`;
                })
                .join("&");

            url = `${url}?${paramString}`;
        }

        return url;
    }

    async request(url, method, data = {}, params = {}, headers = {}) {
        if (this.apiKey) {
            headers["x-bunq-automation-authorization"] = this.apiKey;
        }

        url = this.formatUrl(url, params);

        const requestConfig = {
            url: url,
            method: method,
            headers: headers
        };

        if (Object.keys(data).length > 0) {
            requestConfig.data = data;
        }
        if (Object.keys(params).length > 0) {
            requestConfig.params = params;
        }

        return axios(requestConfig).then(response => response.data);
    }

    async get(url, params = {}, headers = {}) {
        return this.request(url, "GET", {}, params, headers);
    }

    async post(url, data = {}, params = {}, headers = {}) {
        return this.request(url, "POST", data, params, headers);
    }

    async put(url, data = {}, params = {}, headers = {}) {
        return this.request(url, "PUT", data, params, headers);
    }
}

export default ApiClient;
