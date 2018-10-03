import React, { PureComponent } from 'react';

import './styles.scss';
// const TITLES = ['Facturen', 'Wachtlijst'];

export default class SitesList extends PureComponent {
  render() {
    return (
      <button type="button" className="SitesList" onClick={this.props.onClick}>
        <div className="list__date">{this.props.date}</div>
        <div className="list__name">{this.props.name}</div>
        <div className="list__amount">{this.props.amount} websites</div>
      </button>
    );
  }
}
