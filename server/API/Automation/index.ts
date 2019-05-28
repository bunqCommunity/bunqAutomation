import Actions from "./Actions";
import Filters from "./Filters";
import Outputs from "./Outputs";
import Schedules from "./Schedules";
import Pipeline from "./Pipeline";

export default (app, opts, next) => {
    app.register(Actions, { prefix: "/actions" });
    app.register(Filters, { prefix: "/filters" });
    app.register(Outputs, { prefix: "/outputs" });
    app.register(Schedules, { prefix: "/schedules" });
    app.register(Pipeline, { prefix: "/pipeline" });

    next();
};
