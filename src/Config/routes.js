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
    {
        path: "/action-test",
        component: "ActionTest",
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
        path: "/content-test",
        component: "ContentTest",
        ignoreRedirects: true
    }
];

module.exports = routes;
