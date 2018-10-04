import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import TagsInput from 'react-tagsinput';
import { connect } from 'react-redux';

import { siteRankActions } from '../../actions';

import './styles.scss';

class SearchBar extends PureComponent {
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
    console.log('action', this.props.actionOnSubmit);
    this.props.getBulkTraffic(this.state.tags).then(res => {
      if (res.type === 'REQUEST_FAIL') {
        console.log(res.err);
      }
    });
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
        <div className="toolTip">Press tab to add multiple URL&#39;s</div>
      </div>
    );
  }
}

const connector = connect(
  ({ siteRank }) => ({ siteRank }),
  dispatch => ({
    getBulkTraffic: sites => dispatch(siteRankActions.getBulkTraffic(sites))
  })
);

export default connector(SearchBar);
