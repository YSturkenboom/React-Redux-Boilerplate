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
    const diff = filter(this.state.tags, item => !includes(oldUrls, item));
    if (diff.length > 0) {
      this.props
        .getBulkTraffic(diff, this.props.siteRank.newListId)
        .then(res => {
          if (res.type === 'GET_TRAFFIC_REQUEST_SUCCESS') {
            this.setState({ tags: [] });
          }
        });
    } else {
      // if there are no new sites in the tags, remove the (useless) tags
      this.setState({ tags: [] });
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
