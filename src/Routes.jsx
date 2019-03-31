import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";

import NotFound from "./Pages/NotFound/NotFound";

const routes = require("./Config/routes");

const mapState = state => ({
    apikey: state.authentication.api_key,
    loading: state.authentication.loading,
    serverStatus: state.server_status.status,
    serverStatusChecked: state.server_status.checked
});

const RouteComponents = {};
routes.map(route => {
    const Component = lazy(() => import(`./Pages/${route.component}/${route.component}.jsx`));
    RouteComponents[route.component] = Component;
});

const Routes = () => {
    const { apikey, loading, serverStatus, serverStatusChecked } = useMappedState(mapState);

    const routeComponents = routes.map(route => {
        // wrap component in a lazy load element
        const Component = RouteComponents[route.component];

        // wrap the lazy loading component in a renderer to redirect for authenticated/unauthenticated routes
        const renderer = props => {
            if (serverStatusChecked) {
                switch (serverStatus) {
                    case "STATUS_FIRST_INSTALL":
                    case "STATUS_PASSWORD_READY":
                        // first install or only a password means we need to do more setup actions
                        if (window.location.pathname !== "/setup") return <Redirect to="/setup" />;
                        break;
                    default:
                        break;
                }
            }

            if (!loading) {
                if (route.authenticated && !apikey && window.location.pathname !== "/login") {
                    return <Redirect key={route.path} to="/login" />;
                } else if (route.unauthenticated && apikey && window.location.pathname !== "/") {
                    return <Redirect key={route.path} to="/" />;
                }
            }

            return <Component key={route.path} {...props} />;
        };

        // return the Route component
        return <Route exact key={route.path} path={route.path} render={renderer} />;
    });

    return (
        <Suspense fallback={<div />}>
            <Switch>
                {routeComponents}

                <Route component={NotFound} />
            </Switch>
        </Suspense>
    );
};

export default Routes;
