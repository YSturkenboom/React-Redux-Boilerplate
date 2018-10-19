import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

export default class FloatingCircleButton extends PureComponent {
  render() {
    const { addNewList } = this.props;
    return (
      <Button className="btn__floating-action" onClick={addNewList}>
        <FontAwesomeIcon icon={faPlus} />
        <br />
        <span className="d-none d-md-block">New List</span>
      </Button>
    );
  }
}
