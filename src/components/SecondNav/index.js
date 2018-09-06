import React, { PureComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { faArrowAltToBottom } from '@fortawesome/pro-solid-svg-icons';

import { Input } from 'reactstrap';

import './styles.scss';

export default class SecondNav extends PureComponent {
  render() {
    return (
      <div className="second-menu__container">
        <div className="container">
          <div className="second-menu__container--left">
            {this.props.children}
          </div>
          <div className="second-menu__container--right">
            <div className="search">
              <Input
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <a href="/" className="btn btn-outline-primary">
              Excel export <FontAwesomeIcon icon={faArrowAltToBottom} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
