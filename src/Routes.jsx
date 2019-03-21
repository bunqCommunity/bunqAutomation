import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import NotFound from "./Pages/NotFound/NotFound";

const routes = require("./Config/routes");

// map config to Page components
const RouteComponents = Object.keys(routes).map(routePattern => {
    const routeName = routes[routePattern];

    // wrap component in a lazy load element
    const Component = lazy(() => import(`./Pages/${routeName}/${routeName}.jsx`));

    // return the Route component
    return <Route exact key={routePattern} path={routePattern} render={props => <Component {...props} />} />;
});

const Routes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                {RouteComponents}

                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
};

export default Routes;
