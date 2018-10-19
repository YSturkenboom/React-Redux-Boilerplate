import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
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
  faBuilding,
  faHeart,
  faSpinnerThird
} from '@fortawesome/pro-solid-svg-icons';
import { registerActions, authActions } from '../../actions';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      completed: false,
      loading: false
    };
  }

  componentDidMount() {
    const { checkSession } = this.props;

    ReactGA.pageview('/register');

    checkSession();
  }

  onSubmitVerify = ev => {
    ev.preventDefault();

    const { register } = this.props;
    const { firstName, lastName, company, email } = this.state;

    this.setState({ loading: true });

    register(firstName, lastName, company, email).then(res => {
      if (res.type === 'REGISTER_FAILED') {
        ReactGA.event({
          category: 'Accounts',
          action: 'Account creation failed'
        });
        toast.error('Sorry could not create an account');
        this.setState({ loading: false });
      } else {
        this.setState({ completed: true, loading: false });
        toast.success('Account successfully created !');
        ReactGA.event({
          category: 'Accounts',
          action: 'Account created'
        });
      }
    });
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { firstName, lastName, company, email } = this.state;

    const { location, auth } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = auth;
    const { completed, loading } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="authentication">
        <Helmet title="Register" />
        {!auth.checkingSession && (
          <div className="container">
            <div className="authentication__content">
              <img alt="logo" src={require('../../images/amsalyze-logo.png')} />
              <Card body className="authentication__window">
                <h4 className="text-center">Register</h4>
                {completed && (
                  <Alert color="success">
                    Thank you for registering! A verification email has been
                    sent to {email}
                  </Alert>
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
                        disabled={completed}
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
                        disabled={completed}
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
                        disabled={completed}
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
                        disabled={completed}
                        bsSize="lg"
                      />
                    </InputGroup>
                  </FormGroup>
                  <span className="spacer" />
                  <Button block size="lg" color="primary">
                    {loading ? (
                      <div>
                        Processing...
                        <FontAwesomeIcon
                          icon={faSpinnerThird}
                          className="fas fa-circle-notch fa-spin"
                        />
                      </div>
                    ) : (
                      <div> Register </div>
                    )}
                  </Button>
                  <span className="spacer" />
                  <Link to="/login" className="text-center text-muted">
                    <small>Already have an account?</small>
                  </Link>
                </Form>
              </Card>
              <a
                className="storyofams__link"
                href="https://storyofams.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Made with <FontAwesomeIcon icon={faHeart} /> by
                <span>
                  Story of <span>AMS</span>
                </span>
              </a>
            </div>
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
