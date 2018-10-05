import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';

import { Navigation } from '../components';
import { Register, Login, EnsureLoggedIn } from '../pages';
import config from '../config';

// Import your global styles here
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../theme/bootstrap.scss';
import './styles.scss';

axios.defaults.withCredentials = true;

faConfig.autoAddCss = false;

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
    <Route path="/register" component={Register} exact />

    <EnsureLoggedIn>
      <Navigation />
      {renderRoutes(route.routes)}
    </EnsureLoggedIn>

    <ToastContainer className="toast-container" />
  </div>
);

export default hot(module)(App);
