import React, { PureComponent } from 'react';
import TagsInput from 'react-tagsinput';
import { map, filter, includes } from 'lodash';
import { isUrl } from 'is-url';

import './styles.scss';

const DEFAULT_TAGS = [];

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
              placeholder: 'Add a website, such as www.google.com'
            }}
          />
          <button
            type="submit"
            className="form__button"
            onClick={() => {
              const oldUrls = map(this.props.ranks, 'url');
              const cleanedNewUrls = this.state.tags.map(
                url =>
                  url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
              );
              const diff = filter(
                cleanedNewUrls,
                item => !includes(oldUrls, item)
              );
              const removeTags = this.props.actionOnSubmit(diff);
              console.log('only remove', removeTags);
              if (removeTags) {
                this.setState({ tags: [] });
              }
            }}
          >
            + Analyze URL(&#39;s)
          </button>
        </div>
        <div className="toolTip">Press space to add multiple URL&#39;s</div>
      </div>
    );
  }
}

export default SearchBar;
