import React, { PureComponent } from 'react';

import './styles.scss';

export default class Homepage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="hello">
        <h1>Hello</h1>
      </div>
    );
  }
}
