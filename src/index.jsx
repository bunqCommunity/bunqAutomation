import React from "react";
import { hydrate, render } from "react-dom";

import App from "./App";
import * as serviceWorker from "./ServiceWorker/serviceWorker";

if (process.env.NODE_ENV === "development") {
    serviceWorker.unregister();
} else {
    serviceWorker.register();
}

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement);
} else {
    render(<App />, rootElement);
}
