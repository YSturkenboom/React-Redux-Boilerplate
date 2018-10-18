import React from 'react';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';

import './styles.scss';

export default ({ staticContext }) => {
  // We have to check if staticContext exists
  // because it will be undefined if rendered through a BrowserRoute
  if (staticContext) staticContext.status = '404'; // eslint-disable-line no-param-reassign

  ReactGA.initialize('UA-92045603-2');
  ReactGA.pageview('/not-found');

  return (
    <div className="NotFound">
      <Helmet title="Page not found" />
      <h1>Uh oh, nothing here!</h1>
      <p>The page you were looking for is not here (anymore)</p>
    </div>
  );
};
