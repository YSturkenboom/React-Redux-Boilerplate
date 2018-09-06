import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { authActions } from '../../actions';

class Logout extends PureComponent {
  componentDidMount() {
    const { logout } = this.props;

    logout();
  }

  render() {
    const { isLoggedIn } = this.props.auth;

    if (!isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: '/' }
          }}
        />
      );
    }

    return null;
  }
}

const connector = connect(
  ({ auth }) => ({ auth }),
  dispatch => ({
    logout: () => dispatch(authActions.logout())
  })
);

export default connector(Logout);
