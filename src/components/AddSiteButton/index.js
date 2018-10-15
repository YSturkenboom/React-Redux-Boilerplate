import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

export default class AddSiteButton extends PureComponent {
  constructor() {
    super();
    this.state = { redirect: false };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="SitesList col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <button
          type="button"
          className="list__item list--add"
          onClick={this.props.addNewList}
        >
          <FontAwesomeIcon icon={faPlus} />
          <div className="list__caption">
            Create new list to analyze websites
          </div>
        </button>
      </div>
    );
  }
}
