import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import './styles.scss';

export default class FloatingCircleButton extends PureComponent {
  render() {
    return (
      <Button className="floatingActionButton" onClick={this.props.onClick}>
        click me
      </Button>
    );
  }
}
