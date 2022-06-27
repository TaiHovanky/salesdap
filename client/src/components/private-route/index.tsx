import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { UserState } from '../../state/reducers/user';

const PrivateRoute = (props: any) => {
  const location = useLocation();
  const { user }: { user: UserState } = props;

  if (
    !user ||
    !user.email
  ) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { from: location }
        }}
      />
    );
  }

  // if (path === '/home' && (user.subscriptionType !== FREE && !user.activeSubscription)) {
  //   return (
  //     <Redirect
  //       to={{
  //         pathname: "/profile",
  //         state: { from: location }
  //       }}
  //     />
  //   );
  // }

  return <Route {...props} />;
};

export default PrivateRoute;