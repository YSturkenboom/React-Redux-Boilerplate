import React, { PureComponent } from 'react';
import TagsInput from 'react-tagsinput';
import { map, filter, includes } from 'lodash';
import { isUrl } from 'is-url';

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
  }

  handleChange(tags) {
    this.setState({ tags });
  }

  handleChangeInput(tag) {
    this.setState({ tag });
  }

  render() {
    return (
      <div>
        <div className="form">
          <TagsInput
            addOnBlur
            className="form__input"
            validate={input => isUrl(input)}
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
          <button
            type="submit"
            className="form__button"
            onClick={() => {
              const oldUrls = map(this.props.ranks, 'url');
              const diff = filter(
                this.state.tags,
                item => !includes(oldUrls, item)
              );
              const res = this.props.actionOnSubmit(diff);
              if (res) {
                this.setState({ tags: [] });
              }
            }}
          >
            + Analyze URL(&#39;s)
          </button>
        </div>
        <div className="toolTip">Press tab to add multiple URL&#39;s</div>
      </div>
    );
  }
}

export default SearchBar;
