import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/layout';
import { useAuth } from './hooks/useAuth';
import Contents from './pages/Contents';
import Courses from './pages/Courses';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Users from './pages/Users';
import { PrivateRoute, PublicRoute } from './Route';
import { authService } from './services/AuthService';

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
        <Route element={<Layout />}>
          <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route
            path="/courses"
            element={<PrivateRoute component={Courses} />}
          />
          <Route
            path="/courses/:id"
            element={<PrivateRoute component={Contents} />}
          />

          <Route
            path="/users"
            element={<PrivateRoute roles={['admin']} component={Users} />}
          />
        </Route>

        <Route path="/login" element={<PublicRoute component={Login} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
