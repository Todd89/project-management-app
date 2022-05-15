import ReactDOM from 'react-dom';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import ErrorBoundary from './components/pages/ErrorRoute/boundaryError';
import store from './react/store';
import './i18n';

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </Suspense>,
  document.getElementById('root')
);
