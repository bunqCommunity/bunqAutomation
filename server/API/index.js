// import Logging from "./Logging";
import Health from "./Health";

export default (app, opts, next) => {
    app.register(Health, { prefix: "/health" });

    next();
};
