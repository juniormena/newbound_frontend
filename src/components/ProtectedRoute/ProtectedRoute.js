import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!getCurrentUser())
                    return (
                        <Redirect
                            to={{ pathname: "/login", state: { from: window.location.pathname } }}
                        />
                    );

                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;