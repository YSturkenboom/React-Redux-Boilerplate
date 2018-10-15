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

import { get } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faRepeat } from '@fortawesome/pro-solid-svg-icons';
import { authActions } from '../../actions';
// import { toastAlert } from '../../utils/helpers';

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password2: ''
    };
  }

  componentDidMount() {
    const { checkSession } = this.props;

    checkSession();
  }

  onSubmitVerify = ev => {
    ev.preventDefault();

    console.log('logging in');

    const { match, resetPassword, history } = this.props;
    const { password, password2 } = this.state;

    if (password !== password2) {
      toast.error('Sorry, the passwords are differents');
    } else if (password.length < 8 && password.length) {
      toast.error('Sorry, the password must have at least 8 characters');
    } else {
      const token = get(match, 'params.token');
      resetPassword(token, password).then(res => {
        if (res.type === 'RESET_PASSWORD_FAILED') {
          console.log(res.error);
          toast.error('Sorry, the password could not be reset');
        } else {
          history.push('/login');
          toast.success('Password successfully reset !');
        }
      });
    }
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = this.props.auth;
    const { password, password2 } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="authentication">
        <Helmet title="Reset password" />

        {!this.props.auth.checkingSession && (
          <div className="authentication__content">
            <img alt="logo" src={require('../../images/amsalyze-logo.png')} />
            <Card body className="authentication__window">
              <h4 className="text-center">Password Reset</h4>
              <span className="spacer" />
              {error && <Alert color="danger">{error}</Alert>}
              <Form onSubmit={this.onSubmitVerify}>
                <FormGroup>
                  <Label hidden for="password">
                    New Password
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
                      value={password}
                      onChange={this.handleInputChange}
                      placeholder="New Password"
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label hidden for="password2">
                    New Password
                  </Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <FontAwesomeIcon icon={faRepeat} />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      name="password2"
                      id="password2"
                      value={password2}
                      onChange={this.handleInputChange}
                      placeholder="Confirm Password"
                      required
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <span className="spacer" />
                <Button block size="lg" color="primary">
                  Reset Password
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
  ({ auth }) => ({ auth }),
  dispatch => ({
    checkSession: () => dispatch(authActions.checkSession()),
    resetPassword: (token, password) =>
      dispatch(authActions.resetPassword(token, password))
  })
);

export default connector(ResetPassword);
