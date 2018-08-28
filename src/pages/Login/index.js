import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

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
            <img alt="logo" src={require('../../images/logo.png')} />
            <Card body className="login-window">
              <h4 className="text-center">Login</h4>
              <span className="spacer" />
              {error && <Alert color="danger">{error}</Alert>}
              <Form onSubmit={this.onSubmitVerify}>
                <FormGroup>
                  <Label hidden for="email">
                    E-mail
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={this.handleInputChange}
                      placeholder="E-mail"
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label hidden for="password">
                    Password
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleInputChange}
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup check>
                  <Input type="checkbox" id="signedIn" />
                  <Label className="text-muted" check for="signedIn">
                    <small>Keep me signed in</small>
                  </Label>
                </FormGroup>
                <span className="spacer" />
                <span className="spacer" />
                <Button block size="lg" color="primary">
                  Login
                </Button>
              </Form>
              <span className="spacer" />
              <a href className="text-center text-muted">
                <small>Forgot your password?</small>
              </a>
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
