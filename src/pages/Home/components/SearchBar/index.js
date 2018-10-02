import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
// import Helmet from 'react-helmet';
import { Dropdown } from 'semantic-ui-react';

// import { map } from 'lodash';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SearchBar extends PureComponent {
  render() {
    return (
      <div>
        <div className="form">
          <Dropdown placeholder="google.com" fluid multiple search selection />
          <input className="form__input" placeholder="google.com" />
          <Button className="button-primary">rank</Button>
        </div>
        <div className="search__tooltip">
          You can add multiple URL&#39;s by separating them with comma&#39;s
        </div>
      </div>
    );
  }
}
