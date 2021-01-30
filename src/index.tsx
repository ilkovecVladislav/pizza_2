import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { Auth0Provider } from '@auth0/auth0-react';

import store from 'store';
import AppRouter from 'routers';
import './index.css';

Sentry.init({
  dsn: 'https://2a79de97b9bb43d2a2aad9bc8f64f8fe@o502735.ingest.sentry.io/5585386',
  release: process.env.REACT_APP_SENTRY_RELEASE,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-fbesr013.us.auth0.com"
      clientId="ybZ8MkMu50RRzw1MNPJ5nfNl8ekRUwby"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
