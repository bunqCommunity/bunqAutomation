import Events from "./Events";
import Image from "./Image";
import MonetaryAccounts from "./MonetaryAccounts";
import User from "./User";

export default (app, opts, next) => {
    app.register(Events, { prefix: "/events" });
    app.register(Image, { prefix: "/image" });
    app.register(MonetaryAccounts, { prefix: "/monetary-accounts" });
    app.register(User, { prefix: "/user" });

    next();
};
