import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useIsAuthorized } from 'pages/Auth/state/selector';

type Props = {
  path: string;
};

const ProtectedRoute: React.FC<Props> = ({ path, children }) => {
  const isAuthorized = useIsAuthorized();

  return <Route path={path} render={() => (isAuthorized ? children : <Redirect to="/" />)} exact />;
};

export default ProtectedRoute;
