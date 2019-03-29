import Image from "./Image";
import User from "./User";

export default (app, opts, next) => {
    app.register(User, { prefix: "/user" });
    app.register(Image, { prefix: "/image" });

    next();
};
