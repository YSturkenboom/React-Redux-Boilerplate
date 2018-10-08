import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

export default Component => {
  const AuthComponent = props => {
    const { pathname } = props.location;
    const { isLoggedIn } = props.auth;

    const currentURL = pathname !== '/logout' ? pathname : '/';

    return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: currentURL } }} />
    );
  };

  return compose(
    withRouter,
    connect(({ auth }) => ({ auth }))
  )(AuthComponent);
};
