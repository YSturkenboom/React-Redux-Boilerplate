import React, { PureComponent } from 'react';
import TagsInput from 'react-tagsinput';
import { map, filter, includes } from 'lodash';

import { connect } from 'react-redux';

import { siteRankActions } from '../../actions';

import './styles.scss';

const DEFAULT_TAGS = ['storyofams.com', 'youtube.com', 'google.com'];

class SearchBar extends PureComponent {
  constructor() {
    super();
    this.state = {
      tags: DEFAULT_TAGS,
      tag: ''
    };
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
    const oldUrls = map(this.props.siteRank.ranks, 'url');
    console.log('oldurls', oldUrls);
    console.log('newurls', this.state.tags);
    const diff = filter(this.state.tags, item => !includes(oldUrls, item));
    console.log('dfff', diff);
    console.log('curList', this.props.siteRank.newListId);
    if (diff.length > 0) {
      console.log(diff);
      this.props.getBulkTraffic(diff, this.props.siteRank.newListId);
    }
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
            addKeys={[9, 13, 32, 188]}
            inputProps={{
              placeholder: 'Add a website'
            }}
          />
          <button type="submit" className="form__button" onClick={this.analyze}>
            + Analyze URL(&#39;s)
          </button>
        </div>
        <div className="toolTip">Press tab to add multiple URL&#39;s</div>
      </div>
    );
  }
}

const connector = connect(
  ({ siteRank }) => ({ siteRank }),
  dispatch => ({
    getBulkTraffic: (sites, listId) =>
      dispatch(siteRankActions.getBulkTraffic(sites, listId))
  })
);

export default connector(SearchBar);
