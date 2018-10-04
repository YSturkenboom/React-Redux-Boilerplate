import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

export default class AddSiteButton extends PureComponent {
  constructor() {
    super();
    this.state = { redirect: false };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <button type="button" className="AddSite" onClick={this.handleOnClick}>
        <FontAwesomeIcon icon={faPlus} />
        <div className="list__name">Create first analysed website list</div>
      </button>
    );
  }
}
