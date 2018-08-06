import React from 'react';
import { Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { Grid } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import { Navigation } from 'components';
import { EnsureLoggedIn, Login } from 'pages';

import config from '../config';

// Import your global styles here
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
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
      <Grid fluid className="app-header background" />

      {renderRoutes(route.routes)}
    </EnsureLoggedIn>

    <ToastContainer className="toast-container" />
  </div>
);

export default App;
