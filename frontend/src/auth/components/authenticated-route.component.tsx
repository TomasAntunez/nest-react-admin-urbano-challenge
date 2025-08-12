import { FC } from 'react';
import { Navigate } from 'react-router';

import { RouteProps } from '../../shared/types';
import { useAuth } from '../hooks';

export const AuthenticatedRoute: FC<RouteProps> = ({
  component: Component,
}) => {
  const { authenticatedUser } = useAuth();

  if (!authenticatedUser) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};
