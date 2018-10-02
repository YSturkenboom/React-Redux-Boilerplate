import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
// import Helmet from 'react-helmet';
// import { Dropdown } from 'semantic-ui-react';

// import { map } from 'lodash';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SearchBar extends PureComponent {
  render() {
    return (
      <div>
        <div className="form">
          <input className="form__input" placeholder="google.com" />
          <Button className="button-primary">+ Analyze URL(&#39;s)</Button>
        </div>
        Press spacebar to add multiple URL&#39;s
      </div>
    );
  }
}
