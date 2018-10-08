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
      <div>
        <button
          type="button"
          className="AddSite"
          onClick={this.props.addNewList}
        >
          <FontAwesomeIcon icon={faPlus} />
          <div className="list__name">Create first analysed website list</div>
        </button>
      </div>
    );
  }
}
