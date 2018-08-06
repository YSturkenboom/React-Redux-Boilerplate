import React, { PureComponent } from 'react';

import './styles.scss';

export default class Header extends PureComponent {
  render() {
    const { title } = this.props;

    return (
      <div className="Header">
        <h1>{title}</h1>
      </div>
    );
  }
}
