import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

class EnsureLoggedIn extends PureComponent {
  render() {
    const { pathname } = this.props.location;
    const { isLoggedIn } = this.props.auth;

    const currentURL = pathname !== '/logout' ? pathname : '/';

    if (isLoggedIn) {
      return this.props.children;
    }

    if (pathname !== '/login' && pathname !== '/admin') {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: currentURL }
          }}
        />
      );
    }

    return null;
  }
}

const connector = connect(({ auth }) => ({ auth }));

export default compose(
  hot(module),
  withRouter,
  connector
)(EnsureLoggedIn);
