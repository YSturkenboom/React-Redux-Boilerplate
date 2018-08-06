import React from 'react';
import Helmet from 'react-helmet';
import { Badge } from 'react-bootstrap';

import { Header } from 'components';

import './styles.scss';

export default ({ staticContext }) => {
  // We have to check if staticContext exists
  // because it will be undefined if rendered through a BrowserRoute
  if (staticContext) staticContext.status = '404'; // eslint-disable-line no-param-reassign

  return (
    <div className="NotFound">
      <Helmet title="Pagina niet gevonden" />
      <Header title="Pagina niet gevonden" back="Naar homepagina" />

      <div className="container container-medium">
        <div className="card card-big">
          <Badge className="badge-big badge-error">foutmelding</Badge>

          <h2>Oeps, pagina niet gevonden</h2>
          <p className="text-default">
            Het lijkt erop dat de pagina die je zoekt niet (meer) bestaat.
          </p>
        </div>
      </div>
    </div>
  );
};
