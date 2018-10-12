import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
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
      completed: false
    };
  }

  componentDidMount() {
    const { checkSession } = this.props;

    checkSession();
  }

  onSubmitVerify = ev => {
    ev.preventDefault();

    const { register } = this.props;
    const { firstName, lastName, company, email } = this.state;

    register(firstName, lastName, company, email).then(res => {
      if (res.type === 'REGISTER_FAILED') {
        toast.error('Sorry could not create an account');
      } else {
        this.setState({ completed: true });
        toast.success('Account successfully created !');
      }
    });
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = this.props.auth;
    const { firstName, lastName, company, email } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="Register">
        <Helmet title="Register" />
        {!this.props.auth.checkingSession && (
          <div className="login-content">
            <Card body className="login-window">
              {this.state.completed ? (
                <h4>
                  Thank you for registering! A verification email has been sent
                  to {this.state.email}
                </h4>
              ) : (
                <h4 className="text-center">Register</h4>
              )}
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
                      disabled={this.state.completed}
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
                      disabled={this.state.completed}
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
                      disabled={this.state.completed}
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
                      disabled={this.state.completed}
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
                  <small>Already have an account?</small>
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
    register: (firstName, lastName, company, email) =>
      dispatch(registerActions.register(firstName, lastName, company, email))
  })
);

export default connector(Register);
