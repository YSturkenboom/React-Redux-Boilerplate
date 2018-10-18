import axios from 'axios';
import { get } from 'lodash';

import { apiUrl } from '../config';

export const checkSession = () => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/auth/session`);

    if (res.data.account) {
      return dispatch({ type: 'AUTH_LOGGED_IN', account: res.data.account });
    }

    return dispatch({ type: 'AUTH_NOT_LOGGED_IN' });
  } catch (err) {
    const res = err.response;

    dispatch({ type: 'AUTH_NOT_LOGGED_IN' });
    return dispatch({ type: 'AUTH_FAILED', err: get(res, 'data.error') });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password
    });

    return dispatch({ type: 'AUTH_LOGGED_IN', account: res.data.account });
  } catch (err) {
    const res = err.response;
    return dispatch({ type: 'AUTH_FAILED', err: res.data.error });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
    return dispatch({ type: 'AUTH_LOGGED_OUT_SUCCESS' });
  } catch (err) {
    return dispatch({ type: 'AUTH_LOGGED_OUT_FAILED' });
  }
};

export const forgotPassword = email => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/auth/forgot-password`, { email });
    dispatch({ type: 'FORGOT_PASSWORD_SENT' }, res.data);
  } catch (err) {
    const res = err.response;
    dispatch({ type: 'FORGOT_PASSWORD_FAILED', err: res.data.error });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  try {
    await axios.put(`${apiUrl}/accounts/set-password`, { token, password });
    return dispatch({ type: 'RESET_PASSWORD_SUCCESS' });
  } catch (err) {
    return dispatch({ type: 'RESET_PASSWORD_FAILED', error: err });
  }
};
