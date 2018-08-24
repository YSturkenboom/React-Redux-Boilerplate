import React from 'react';
import { Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';

import { Navigation } from 'components';
import { EnsureLoggedIn, Login } from 'pages';

import config from '../config';

// Import your global styles here
import '../theme/bootstrap.scss';
import './styles.scss';

const scrollToTop = () => {
  if (typeof window === 'object') {
    window.scrollTo(0, 0);
  }
  return null;
};

const App = ({ route }) => (
  <div className="App">
    <Helmet {...config.app} />
    <Route path="/" component={scrollToTop} />

    <Route path="/login" component={Login} exact />

    <EnsureLoggedIn>
      <Navigation />

      {renderRoutes(route.routes)}
    </EnsureLoggedIn>

    <ToastContainer className="toast-container" />
  </div>
);

export default hot(module)(App);
