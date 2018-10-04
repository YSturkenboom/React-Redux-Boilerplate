import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

export default class FloatingCircleButton extends PureComponent {
  render() {
    return (
      <Button className="floatingActionButton " onClick={this.props.onClick}>
        <FontAwesomeIcon icon={faPlus} />
        <br />
        New List
      </Button>
    );
  }
}
