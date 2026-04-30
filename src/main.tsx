import React from 'react';
import ReactDOM from 'react-dom/client';
import { getQueryClient } from '@/app/queryClient';
import { initDemoIfNeeded } from '@/app/demo'; // demo data seeding

import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from '@/App';
import '@/App.css';
import '@/index.css';
import { store } from '@/app/store';
import { ToastProvider } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ui/ErrorBoundary'; // crash fallback UI

initDemoIfNeeded(); // seed demo cart + wishlist before app mounts

ReactDOM.createRoot(document.getElementById('root')!).render( // mount app to #root
  <React.StrictMode>
    <Provider store={store}> {/* redux provider */}
      <QueryClientProvider client={getQueryClient()}> {/* react-query provider */}
        <ToastProvider> {/* toast context */}
          <ErrorBoundary> {/* global crash protection */}
            <App /> {/* route tree */}
          </ErrorBoundary>
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
