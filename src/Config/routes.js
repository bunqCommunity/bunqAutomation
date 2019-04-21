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
        path: "/actions",
        component: "ActionOverview",
        authenticated: true
    },
    {
        path: "/monetary-accounts",
        component: "MonetaryAccounts",
        authenticated: true
    },
    {
        path: "/action/:actionId",
        component: "ActionDetails",
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
    }
];

module.exports = routes;
