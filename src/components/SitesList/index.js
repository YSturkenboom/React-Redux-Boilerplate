import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import './styles.scss';

export default class SitesList extends PureComponent {
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
      return <Redirect push to={`/${this.props.id}`} />;
    }
    return (
      <button type="button" className="SitesList" onClick={this.handleOnClick}>
        <div className="list__date">{this.props.date}</div>
        <div className="list__name">{this.props.name}</div>
        <div className="list__amount">{this.props.amount} websites</div>
      </button>
    );
  }
}
