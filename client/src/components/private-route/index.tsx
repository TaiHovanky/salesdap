import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

const PrivateRoute = (props: any) => {
  const location = useLocation();

  return props.user && props.user.email ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: { from: location }
      }}
    />
  );
};

export default PrivateRoute;