import { ComponentType, useContext } from 'react';
import { Navigate } from 'react-router';

import { AuthenticationContext } from './context/AuthenticationContext';

type BaseProps = {
  component: ComponentType;
};

type PrivateRouteProps = BaseProps & {
  roles?: string[];
};

export function PrivateRoute({
  roles,
  component: Component,
}: PrivateRouteProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);

  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(authenticatedUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
}

export function PublicRoute({ component: Component }: BaseProps) {
  const { authenticatedUser } = useContext(AuthenticationContext);
  return authenticatedUser ? <Navigate to="/" replace /> : <Component />;
}
