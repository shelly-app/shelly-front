import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';

import AppProvider from '@/provider';
import AppRouter from '@/router';

console.log('HERE');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </StrictMode>,
);
