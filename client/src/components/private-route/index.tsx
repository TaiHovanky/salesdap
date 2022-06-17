import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { FREE, UserState } from '../../state/reducers/user';

const PrivateRoute = (props: any) => {
  const location = useLocation();
  const { user, path }: { user: UserState, path: string } = props;
  console.log('props private route', props);

  if (
    !user ||
    !user.email
  ) {
    // if (path === '/profile' && props.location && props.location.search && props.location.search.length) {
    //   console.log('is profile success page');
    //   return <Route {...props} />;
    // }
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location }
        }}
      />
    );
  }

  if (path === '/home' && (user.subscriptionType !== FREE && !user.activeSubscription)) {
    return (
      <Redirect
        to={{
          pathname: "/profile",
          state: { from: location }
        }}
      />
    );
  }

  return <Route {...props} />;
};

export default PrivateRoute;