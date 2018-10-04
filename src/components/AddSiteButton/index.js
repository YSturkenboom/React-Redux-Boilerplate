import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class AddSiteButton extends PureComponent {
  render() {
    return (
      <button type="button" className="AddSite" onClick={this.props.onClick}>
        <FontAwesomeIcon icon={faPlus} />
        <div className="list__name">Create first analysed website list</div>
      </button>
    );
  }
}
