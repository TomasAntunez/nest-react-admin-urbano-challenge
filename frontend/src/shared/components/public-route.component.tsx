import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../auth/hooks';
import { RouteProps } from '../types';

export const PublicRoute: FC<RouteProps> = ({ component: Component }) => {
  const { authenticatedUser } = useAuth();
  return authenticatedUser ? <Navigate to="/" replace /> : <Component />;
};
