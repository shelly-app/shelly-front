import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { AppProvider } from '@/components/providers/app-provider';
import { AppRouter } from '@/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <AppRouter />
    </AppProvider>
  </StrictMode>,
);
