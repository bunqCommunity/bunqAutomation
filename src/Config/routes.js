const routes = [
    {
        path: "/",
        component: "Home",
        authenticated: true
    },
    {
        path: "/test",
        component: "Test"
    },
    {
        path: "/login",
        component: "LoginPassword",
        unauthenticated: true
    },
    {
        path: "/setup",
        component: "Setup",
        unauthenticated: true
    },
    {
        path: "/404",
        component: "NotFound"
    }
];

module.exports = routes;
