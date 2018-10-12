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
    this.props.actionOnClick();
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/halloooo" />;
    }
    return (
      <Button className="btn__floating-action" onClick={this.props.addNewList}>
        <FontAwesomeIcon icon={faPlus} />
        <br />
        New List
      </Button>
    );
  }
}
