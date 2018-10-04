import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';

import TagsInput from 'react-tagsinput';

// import 'react-tagsinput/react-tagsinput.css';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SearchBar extends PureComponent {
  constructor() {
    super();
    this.state = { tags: ['storyofams.com', 'google.com'] };
    this.handleChange.bind(this);
  }

  handleChange() {
    console.log('input changed', this);
  }

  analyze() {
    console.log('analyzing', this);
  }

  render() {
    return (
      <div>
        <div className="form">
          <TagsInput
            value={this.state.tags}
            onChange={this.handleChange}
            className="form__input"
            placeholder="google.com"
          />
          <Button className="button-primary" onClick={this.analyze}>
            + Analyze URL(&#39;s)
          </Button>
        </div>
        <div className="toolTip">Press spacebar to add multiple URL&#39;s</div>
      </div>
    );
  }
}
