import Callback from "./Callback";
import Login from "./Login";

export default (app, opts, next) => {
    app.register(Callback, { prefix: "/callback" });
    app.register(Login, { prefix: "/login" });

    next();
};
