import React, { PureComponent, Fragment } from 'react';
import TagsInput from 'react-tagsinput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { map, filter, includes } from 'lodash';
import { isUrl } from 'is-url';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';

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
            onlyUnique
            renderTag={this.customRenderTag}
            inputProps={{
              placeholder: 'Add a website, such as www.google.com'
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              const oldUrls = map(this.props.ranks, 'url');
              const diff = filter(
                cleanUrls(this.state.tags),
                item => !includes(cleanUrls(oldUrls), item)
              );
              this.props.actionOnSubmit(diff).then(shouldRemove => {
                console.log('only remove', shouldRemove);
                if (shouldRemove) {
                  this.setState({ tags: [] });
                }
              });
            }}
          >
            {this.props.isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="fas fa-circle-notch fa-spin"
              />
            ) : (
              <div>+ Analyze URL(&#39;s)</div>
            )}
          </button>
        </div>
        <div className="toolTip">Press space to add multiple URL&#39;s</div>
      </div>
    );
  }
}

export default SearchBar;
