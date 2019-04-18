const routes = [
    // authenticated pages
    {
        path: "/",
        component: "Home",
        authenticated: true
    },
    {
        path: "/bunq-api-keys",
        component: "BunqApiKeys",
        authenticated: true
    },

    // login pages
    {
        path: "/login",
        component: "LoginPassword"
    },
    {
        path: "/setup",
        component: "Setup"
    },

    // fallback 404 page
    {
        path: "/404",
        component: "NotFound"
    },

    // test pages
    {
        path: "/action-test",
        component: "ActionTest",
        authenticated: true
    }
];

module.exports = routes;
