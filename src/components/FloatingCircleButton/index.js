import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-regular-svg-icons';
import './styles.scss';

export default class FloatingCircleButton extends PureComponent {
  constructor() {
    super();
    this.state = { redirect: false };
  }

  handleOnClick = () => {
    this.setState({ redirect: true });
    const { actionOnClick } = this.props;
    actionOnClick();
  };

  render() {
    const { addNewList } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect push to="/halloooo" />;
    }
    return (
      <Button className="btn__floating-action" onClick={addNewList}>
        <FontAwesomeIcon icon={faPlus} />
        <br />
        <span className="d-none d-md-block">New List</span>
      </Button>
    );
  }
}
