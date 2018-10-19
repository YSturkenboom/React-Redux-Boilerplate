import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

export default Component => {
  const AuthComponent = props => {
    const { location, auth } = props;
    const { pathname } = location;
    const { isLoggedIn } = auth;

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
