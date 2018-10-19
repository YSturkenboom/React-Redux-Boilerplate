import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
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
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faHeart } from '@fortawesome/pro-solid-svg-icons';
import { authActions } from '../../actions';

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

    ReactGA.pageview('/login');

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
    const { location, auth, history } = this.props;
    const { from } = location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = auth;
    const { email, password } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="authentication">
        <Helmet title="Login" />

        {!auth.checkingSession && (
          <div className="container">
            <div className="authentication__content">
              <img alt="logo" src={require('../../images/amsalyze-logo.png')} />
              <Card body className="authentication__window">
                <h4 className="text-center">Login</h4>
                <span className="spacer" />
                {error && <Alert color="danger">{error}</Alert>}
                <Form onSubmit={this.onSubmitVerify}>
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
                  <FormGroup check>
                    <Input type="checkbox" id="signedIn" />
                    <Label className="text-muted" check for="signedIn">
                      <small>Keep me signed in</small>
                    </Label>
                  </FormGroup>
                  <span className="spacer" />
                  <span className="spacer" />
                  <Button block size="lg" color="secondary">
                    Login
                  </Button>
                </Form>
                <span className="spacer" />
                <small className="text-center"> or </small>
                <span className="spacer" />
                <Button
                  onClick={() => history.push('/register')}
                  block
                  size="lg"
                  color="primary"
                >
                  Create a new account
                </Button>
                <span className="spacer" />

                <a href="/forgot-password" className="text-center text-muted">
                  <small>Forgot your password?</small>
                </a>
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
  ({ auth }) => ({ auth }),
  dispatch => ({
    checkSession: () => dispatch(authActions.checkSession()),
    login: (username, password) =>
      dispatch(authActions.login(username, password))
  })
);

export default connector(Login);
