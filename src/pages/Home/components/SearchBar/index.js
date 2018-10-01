import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';

import { TagsInput } from 'react-tagsinput';

// import Helmet from 'react-helmet';

// import { map } from 'lodash';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SearchBar extends PureComponent {
  constructor() {
    super();
    this.state = { tags: [] };
  }

  handleChange(tags) {
    this.setState({ tags });
  }

  render() {
    return (
      <div>
        <div className="form">
          <TagsInput value={this.state.tags} onChange={this.handleChange} />
          <input className="form__input" placeholder="google.com" />
          <Button className="form__button">rank</Button>
        </div>
        <div className="search__tooltip">
          You can add multiple URL&#39;s by separating them with comma&#39;s
        </div>
      </div>
    );
  }
}
