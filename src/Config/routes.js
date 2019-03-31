const routes = [
    {
        path: "/",
        component: "Home",
        authenticated: true
    },
    {
        path: "/login",
        component: "LoginPassword"
    },
    {
        path: "/setup",
        component: "Setup"
    },
    {
        path: "/404",
        component: "NotFound"
    }
];

module.exports = routes;
