import API from "./API/index.js";

export default app => {
    // API routes
    app.register(API, { prefix: "/api" });
};
