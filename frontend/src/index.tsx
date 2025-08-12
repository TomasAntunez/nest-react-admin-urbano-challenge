import './shared/styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';

import { App } from './app';
import { AuthenticationProvider } from './auth/contexts';
import { reportWebVitals } from './reportWebVitals';

const queryClient = new QueryClient();

const root = document.getElementById('root');
createRoot(root).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthenticationProvider>
  </React.StrictMode>,
);

reportWebVitals();
