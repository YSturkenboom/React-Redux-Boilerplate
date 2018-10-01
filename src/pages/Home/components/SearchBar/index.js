import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
// import Helmet from 'react-helmet';

// import { map } from 'lodash';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SearchBar extends PureComponent {
  render() {
    return (
      <div>
        <input value="helloooooooo" />
        <Button>Rank</Button>
        <div className="search__tooltip">
          You can add multiple URL&#39;s by separating them with comma&#39;s
        </div>
      </div>
    );
  }
}
