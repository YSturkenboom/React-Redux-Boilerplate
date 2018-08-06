import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
// import { toast } from 'react-toastify';

import { Header } from 'components';

import './styles.scss';

export default class Home extends PureComponent {
  render() {
    const title = 'Home';

    return (
      <div className="Home">
        <Helmet title={title} />
        <Header title={title} />

        <div className="container">
          <h1>Home</h1>
        </div>
      </div>
    );
  }
}
