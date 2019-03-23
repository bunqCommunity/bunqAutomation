import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger/src/index";
import thunk from "redux-thunk";

// fetch all reducers as a bundle
import reducer from "./Redux/Reducers/reducers.js";

let middleware;
if (process.env.NODE_ENV === "development") {
    middleware = applyMiddleware(
        thunk,
        createLogger({
            collapsed: true,
            timestamp: false
        })
    );
} else {
    middleware = applyMiddleware(thunk);
}

//return the store
export default (initialValues = {}) => {
    return createStore(reducer, initialValues, middleware);
};
