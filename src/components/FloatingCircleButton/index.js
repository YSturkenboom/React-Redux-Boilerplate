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
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <Button className="floatingActionButton " onClick={this.handleOnClick}>
        <FontAwesomeIcon icon={faPlus} />
        <br />
        New List
      </Button>
    );
  }
}
