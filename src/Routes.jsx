import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";

import NotFound from "./Pages/NotFound/NotFound";

const routes = require("./Config/routes");

// map config to Page components
const routeMapper = ({ api_key, loading }) => {
    return routes.map(route => {
        // wrap component in a lazy load element
        const Component = lazy(() => import(`./Pages/${route.component}/${route.component}.jsx`));

        // wrap the lazy loading component in a renderer to redirect for authenticated/unauthenticated routes
        const renderer = props => {
            if (!loading) {
                if (route.authenticated && !api_key && window.location.pathname !== "/login") {
                    return <Redirect to="/login" />;
                } else if (route.unauthenticated && api_key && window.location.pathname !== "/") {
                    return <Redirect to="/" />;
                }
            }

            return <Component {...props} />;
        };

        // return the Route component
        return <Route exact key={route.path} path={route.path} render={renderer} />;
    });
};

const mapState = state => ({
    api_key: state.authentication.api_key,
    loading: state.authentication.loading
});

const Routes = () => {
    const { api_key, loading } = useMappedState(mapState);

    const routeComponents = routeMapper({ api_key, loading });

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
