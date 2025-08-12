import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AuthenticatedRoute, AuthorizedRoute } from './auth/components';
import { useAuth } from './auth/hooks';
import { LoginPage } from './auth/pages';
import { authService } from './auth/services';
import { ContentCoursesPage } from './content-course/pages';
import { CoursesPage } from './course/pages';
import { DashboardPage } from './dashboard/pages';
import { Layout, PublicRoute } from './shared/components';
import { UsersPage } from './user/pages';

export function App() {
  const { authenticatedUser, setAuthenticatedUser } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  const authenticate = async () => {
    try {
      const authResponse = await authService.refresh();
      setAuthenticatedUser(authResponse.user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (!authenticatedUser) {
      authenticate();
    } else {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute component={LoginPage} />} />

        <Route element={<AuthenticatedRoute component={Layout} />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<ContentCoursesPage />} />

          <Route
            path="/users"
            element={
              <AuthorizedRoute roles={['admin']} component={UsersPage} />
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
