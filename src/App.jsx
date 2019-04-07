import React from "react";
import io from "socket.io-client";
import { StoreContext } from "redux-react-hook";
import { BrowserRouter } from "react-router-dom";

import { API_KEY_LOCATION } from "./Redux/Reducers/authentication";

import "./App.scss";

import Store from "./Store";
import ApiClient from "./Classes/ApiClient";
import RoutesWrapper from "./RoutesWrapper";

const store = Store();

const apiClient = new ApiClient();
window.apiClient = apiClient;

// update apiClient with the stored apiKey as soon as possible if it is available
const storedApiKey = localStorage.getItem(API_KEY_LOCATION);
if (storedApiKey) window.apiClient.apiKey = storedApiKey;

const socket = io(process.env.REACT_APP_SERVER_URL);
window.socket = socket;

const App = () => {
    return (
        <StoreContext.Provider value={store}>
            <BrowserRouter forceRefresh={false}>
                <RoutesWrapper />
            </BrowserRouter>
        </StoreContext.Provider>
    );
};

export default App;
