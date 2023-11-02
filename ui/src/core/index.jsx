/* external imports */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
/* store */
import store from './reducers/store';
/* internal components */
import ErrorBoundary from './configs/ErrorBoundary';
import Routes from './routes/route';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// eslint-disable-next-line no-console
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <GoogleOAuthProvider
            clientId={import.meta.env.VITE_CLIENT_ID}
          >
            <Routes />
          </GoogleOAuthProvider>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>,
);
