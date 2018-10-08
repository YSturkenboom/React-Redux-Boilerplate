import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect, Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faUser,
  faBuilding
} from '@fortawesome/pro-solid-svg-icons';
import { registerActions, authActions } from '../../actions';

import './styles.scss';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      company: '',
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

    const { register } = this.props;
    const { firstName, lastName, company, email, password } = this.state;

    register(firstName, lastName, company, email, password);
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = this.props.auth;
    const { firstName, lastName, company, email, password } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="Register">
        <Helmet title="Register" />

        {!this.props.auth.checkingSession && (
          <div className="login-content">
            <Card body className="login-window">
              <h4 className="text-center">Register</h4>
              <span className="spacer" />
              {error && <Alert color="danger">{error}</Alert>}
              <Form onSubmit={this.onSubmitVerify}>
                <FormGroup>
                  <Label hidden for="firstName">
                    First name
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="firstName"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      onChange={this.handleInputChange}
                      placeholder="Firstname"
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label hidden for="LastName">
                    Last name
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="lastName"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      onChange={this.handleInputChange}
                      placeholder="Lastname"
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label hidden for="company">
                    Company
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faBuilding} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="company"
                      name="company"
                      id="company"
                      value={company}
                      onChange={this.handleInputChange}
                      placeholder="Company"
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label hidden for="email">
                    E-mail
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroupText>
                    </InputGroupAddon>
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
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroupText>
                    </InputGroupAddon>
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
                <span className="spacer" />
                <span className="spacer" />
                <Button block size="lg" color="primary">
                  Register
                </Button>
                <span className="spacer" />
                <Link to="/login" className="text-center text-muted">
                  <small>Login</small>
                </Link>
              </Form>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const connector = connect(
  ({ register, auth }) => ({ register, auth }),
  dispatch => ({
    checkSession: () => dispatch(authActions.checkSession()),
    register: (firstName, lastName, company, email, password) =>
      dispatch(
        registerActions.register(firstName, lastName, company, email, password)
      )
  })
);

export default connector(Register);
