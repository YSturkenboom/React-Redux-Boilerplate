import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import { authActions } from 'actions';

import './styles.scss';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    const { checkSession } = this.props;

    checkSession();
  }

  onSubmitVerify = ev => {
    ev.preventDefault();

    const { login } = this.props;
    const { username, password } = this.state;

    login(username, password);
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = this.props.auth;
    const { username, password } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="Login">
        <Helmet title="Login" />

        <div className="login-background background" />

        {!this.props.auth.checkingSession && (
          <div className="login-content">
            <a href="/">Home</a>
            <h1 className="h2">Login</h1>
            <div className="login-window">
              <div className="login-window-header">
                <h4>Login</h4>
              </div>

              <div className="login-window-body">
                {error && <Alert bsStyle="danger">{error}</Alert>}

                <form onSubmit={this.onSubmitVerify} autoComplete="off">
                  <label htmlFor="Username">
                    Username
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="input-round"
                      placeholder="Username"
                      value={username}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <label htmlFor="password">
                    Password
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="input-round"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </label>
                  <input
                    type="submit"
                    className="btn btn-block"
                    value="Login"
                  />
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const connector = connect(
  ({ auth }) => ({ auth }),
  dispatch => ({
    checkSession: () => dispatch(authActions.checkSession()),
    login: (username, password) =>
      dispatch(authActions.login(username, password))
  })
);

export default connector(Login);
