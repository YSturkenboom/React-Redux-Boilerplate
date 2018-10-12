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
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import { authActions } from '../../actions';

import './styles.scss';

class ForgotPassword extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
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

    console.log('logging in');

    const { forgotPassword, history } = this.props;
    const { email } = this.state;

    forgotPassword(email).then(() => {
      history.push('/login');
      toast.success('If this account exists you should have received an email');
    });
  };

  handleInputChange = ev => {
    const { name, value } = ev.target;

    this.setState({ [name]: value });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { isLoggedIn, error } = this.props.auth;
    const { email } = this.state;

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <div className="forgotpassword">
        <Helmet title="ForgotPassword" />

        {!this.props.auth.checkingSession && (
          <div className="forgotpassword-content">
            <Card body className="forgotpassword-window">
              {this.state.completed ? (
                <h4>
                  Thank you for registering! A link to reset your password has
                  been sent to {this.state.email}
                </h4>
              ) : (
                <h4 className="text-center">Password Reset</h4>
              )}
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
                      disabled={this.state.completed}
                      bsSize="lg"
                    />
                  </InputGroup>
                </FormGroup>
                <span className="spacer" />
                <span className="spacer" />
                <Button block size="lg" color="primary">
                  Reset Password
                </Button>
              </Form>
              <span className="spacer" />
              <Link to="/register" className="text-center text-muted">
                <small>Register</small>
              </Link>
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
    forgotPassword: email => dispatch(authActions.forgotPassword(email))
  })
);

export default connector(ForgotPassword);
