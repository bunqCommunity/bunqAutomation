import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useMappedState } from "redux-react-hook";

import NotFound from "./Pages/NotFound/NotFound";

const routes = require("./Config/routes");

const mapState = state => ({
    apikey: state.authentication.api_key,
    loading: state.authentication.loading,
    serverStatus: state.server_status.status
});

const Routes = () => {
    const { apikey, loading, serverStatus } = useMappedState(mapState);

    const routeComponents = routes.map(route => {
        // wrap component in a lazy load element
        const Component = lazy(() => import(`./Pages/${route.component}/${route.component}.jsx`));

        // wrap the lazy loading component in a renderer to redirect for authenticated/unauthenticated routes
        const renderer = props => {
            if (!loading) {
                if (
                    route.authenticated &&
                    !apikey &&
                    window.location.pathname !== "/login" &&
                    window.location.pathname !== "/setup"
                ) {
                    console.log(serverStatus);
                    switch (serverStatus) {
                        case "STATUS_FIRST_INSTALL":
                        case "STATUS_PASSWORD_READY":
                            return <Redirect to="/setup" />;
                        default:
                            return <Redirect to="/login" />;
                    }
                } else if (route.unauthenticated && apikey && window.location.pathname !== "/") {
                    return <Redirect to="/" />;
                }
            }

            return <Component {...props} />;
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
