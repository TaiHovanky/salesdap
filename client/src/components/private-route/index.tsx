import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props: any) => {
  const location = useLocation();

  return props.user && props.user.email ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: location }
      }}
    />
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);