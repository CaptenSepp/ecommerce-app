// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { getQueryClient } from './store/queryClient';

import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={getQueryClient()}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
