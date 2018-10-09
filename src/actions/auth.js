import axios from 'axios';

import { apiUrl } from '../config';

axios.defaults.withCredentials = true;

export const checkSession = () => async dispatch => {
  try {
    const res = await axios.get(`${apiUrl}/auth/session`);

    if (res.data.account) {
      dispatch({ type: 'AUTH_LOGGED_IN', account: res.data.account });
    } else {
      dispatch({ type: 'AUTH_NOT_LOGGED_IN' });
    }
  } catch (err) {
    const res = err.response;
    dispatch({ type: 'AUTH_NOT_LOGGED_IN' });
    dispatch({ type: 'AUTH_FAILED', err: res.data.error });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, {
      email,
      password
    });

    dispatch({ type: 'AUTH_LOGGED_IN', account: res.data.account });
  } catch (err) {
    const res = err.response;
    dispatch({ type: 'AUTH_FAILED', err: res.data.error });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
    dispatch({ type: 'AUTH_LOGGED_OUT_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'AUTH_LOGGED_OUT_FAILED' });
  }
};

export const forgotPassword = email => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/auth/forgot-password`, { email });
    dispatch({ type: 'FORGOT_PASSWORD_SENT' }, res.data);
  } catch (err) {
    const res = err.response;
    console.log(res);
    dispatch({ type: 'FORGOT_PASSWORD_FAILED', err: res.data.error });
  }
};
