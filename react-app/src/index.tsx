import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import ErrorBoundary from './components/pages/ErrorRoute/boundaryError';
import App from './App';
import store from './react/store';
import './i18n';
const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </Suspense>
);
