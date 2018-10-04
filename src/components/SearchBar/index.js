import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';

import TagsInput from 'react-tagsinput';

// import 'react-tagsinput/react-tagsinput.css';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SearchBar extends PureComponent {
  constructor() {
    super();
    this.state = { tags: ['youtube.com'], tag: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.analyze = this.analyze.bind(this);
  }

  handleChange(tags) {
    this.setState({ tags });
  }

  handleChangeInput(tag) {
    this.setState({ tag });
  }

  analyze() {
    console.log('analyzing', this);
    console.log('send data to API call', this.state.tags);
  }

  render() {
    return (
      <div>
        <div className="form">
          <TagsInput
            className="form__input"
            placeholder="google.com"
            value={this.state.tags}
            onChange={this.handleChange}
            inputValue={this.state.tag}
            onChangeInput={this.handleChangeInput}
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
