import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

type Props = {
  path: string;
};

const ProtectedRoute: React.FC<Props> = ({ path, ...routerProps }) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <Route path={path} {...routerProps} exact /> : <Redirect to="/" />;
};

export default ProtectedRoute;
