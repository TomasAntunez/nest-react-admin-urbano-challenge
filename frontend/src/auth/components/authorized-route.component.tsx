import { FC } from 'react';
import { Navigate } from 'react-router';

import { RouteProps } from '../../shared/types';
import { useAuth } from '../hooks';

type PrivateRouteProps = RouteProps & {
  roles: string[];
};

export const AuthorizedRoute: FC<PrivateRouteProps> = ({
  roles,
  component: Component,
}) => {
  const { authenticatedUser } = useAuth();

  if (!roles.includes(authenticatedUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Component />;
};
