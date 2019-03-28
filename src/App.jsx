import React from "react";
import { StoreContext } from "redux-react-hook";
import { BrowserRouter } from "react-router-dom";

import "./App.scss";

import Store from "./Store";
import RoutesWrapper from "./RoutesWrapper";

const store = Store();

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
