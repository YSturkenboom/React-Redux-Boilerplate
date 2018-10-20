import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';

import config from '../config';

// Import your global styles here
import '../theme/bootstrap.scss';
import './styles.scss';

axios.defaults.withCredentials = true;

// Google Analytics
// ReactGA.initialize(TRACKING CODE HERE);

// Hotjar

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

    {renderRoutes(route.routes)}

    <ToastContainer className="toast-container" />
  </div>
);

export default hot(module)(App);
