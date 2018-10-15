import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { hot } from 'react-hot-loader';
import { ToastContainer } from 'react-toastify';
import { config as faConfig } from '@fortawesome/fontawesome-svg-core';

import { Footer, Navigation } from '../components';
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

    <Navigation />

    {renderRoutes(route.routes)}

    <ToastContainer className="toast-container" />
    <Footer />
  </div>
);

export default hot(module)(App);
