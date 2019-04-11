import Login from "./Login";

export default (app, opts, next) => {
    app.register(Login, { prefix: "/login" });

    next();
};
