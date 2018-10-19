import React, { PureComponent, Fragment } from 'react';
import TagsInput from 'react-tagsinput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map, filter, includes } from 'lodash';
import { isUrl } from 'is-url';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';

import './styles.scss';

const DEFAULT_TAGS = [];

// helper function to help compare URL's
const cleanUrls = urls =>
  urls.map(
    url => url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  );

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

  // this function allows for custom styling of tags with invalid URL's
  customRenderTag = props => {
    const { invalidUrls } = this.props;
    const styleWrongtag = {
      'background-color': '#ef8d8d',
      'border-color': '#ef8d8d',
      color: '#fff'
    };
    const {
      tag,
      key,
      disabled,
      onRemove,
      classNameRemove,
      getTagDisplayValue,
      ...other
    } = props;
    return (
      <Fragment>
        {!disabled && includes(invalidUrls, getTagDisplayValue(tag)) ? (
          <span key={key} style={styleWrongtag} {...other}>
            <b>! </b>
            {getTagDisplayValue(tag)}
            <a className={classNameRemove} onClick={(e) => onRemove(key)} /> {/* eslint-disable-line */}
          </span>
        ) : (
          <span key={key} {...other}>
            {getTagDisplayValue(tag)}
            <a className={classNameRemove} onClick={(e) => onRemove(key)} /> {/* eslint-disable-line */}
          </span>
        )}
      </Fragment>
    );
  };

  handleKeyUp = e => {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    } else if (e.key === ' ') {
      //
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const { ranks, actionOnSubmit } = this.props;
    const { tags } = this.state;
    const oldUrls = map(ranks, 'url');
    const diff = filter(
      cleanUrls(tags),
      item => !includes(cleanUrls(oldUrls), item)
    );
    actionOnSubmit(diff).then(shouldRemove => {
      if (shouldRemove) {
        this.setState({ tags: [] });
      }
    });
  };

  handleChangeInput(tag) {
    this.setState({ tag });
  }

  handleChange(tags) {
    this.setState({ tags });
  }

  render() {
    const { tags, tag } = this.state;
    const { isLoading } = this.props;
    return (
      <div>
        <div className="d-flex flex-column">
          <div className="d-flex search-bar">
            <TagsInput
              addOnBlur
              validate={input => isUrl(input) && input.includes('.')}
              placeholder="google.com"
              // labelField="sites"
              value={tags}
              onChange={this.handleChange}
              inputValue={tag}
              onChangeInput={this.handleChangeInput}
              addKeys={[9, 13, 188]}
              onlyUnique
              renderLayout={(tagComponents, inputComponent) => (
                <span>
                  <div className="form__input px-2">{inputComponent}</div>
                  {tagComponents}
                </span>
              )}
              renderTag={this.customRenderTag}
              inputProps={{
                onKeyUp: this.handleKeyUp,
                placeholder: 'Add a website (e.g. www.google.com)'
              }}
            />

            <div>
              <button
                type="submit"
                className="btn btn-primary form__button py-3 btn-icon"
                onClick={this.handleSubmit}
              >
                {isLoading ? (
                  <div>
                    Analyzing...
                    <FontAwesomeIcon
                      icon={faSpinnerThird}
                      className="fas fa-circle-notch fa-spin"
                    />
                  </div>
                ) : (
                  <div>Analyze</div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="toolTip mt-3">Press tab to add multiple URL&#39;s</div>
      </div>
    );
  }
}

export default SearchBar;
