import React from "react";
import io from "socket.io-client";
import { StoreContext } from "redux-react-hook";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

import Store from "./Store";
import ApiClient from "./Classes/ApiClient";
import RoutesWrapper from "./RoutesWrapper";

const store = Store();

const apiClient = new ApiClient();
const socket = io(process.env.REACT_APP_SERVER_URL);
window.apiClient = apiClient;
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
