import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { authActions } from '../../actions';

class Logout extends PureComponent {
  componentDidMount() {
    const { logout } = this.props;

    ReactGA.initialize('UA-92045603-2');
    ReactGA.pageview('/logout');

    logout();
  }

  render() {
    const { auth } = this.props;

    if (!auth.isLoggedIn) {
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
