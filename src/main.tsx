// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { getQueryClient } from '@/app/queryClient';

import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from '@/App';
import '@/App.css';
import '@/index.css';
import { store } from '@/app/store';
import { ToastProvider } from '@/components/ui/Toast';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={getQueryClient()}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
