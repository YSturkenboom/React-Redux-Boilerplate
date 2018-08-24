import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Alert, Button, Card, Form, FormGroup, Label, Input } from 'reactstrap';

import { authActions } from 'actions';

import './styles.scss';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
    const { email, password } = this.state;

    login(email, password);
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = this.props.auth;
    const { email, password } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="Login">
        <Helmet title="Login" />

        {!this.props.auth.checkingSession && (
          <div className="login-content">
            <h1 className="text-center">Login</h1>

            <Card body className="login-window">
              {error && <Alert color="danger">{error}</Alert>}

              <Form onSubmit={this.onSubmitVerify}>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={this.handleInputChange}
                    placeholder="E-mail"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.handleInputChange}
                  />
                </FormGroup>

                <Button color="primary">Login</Button>
              </Form>
            </Card>
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
