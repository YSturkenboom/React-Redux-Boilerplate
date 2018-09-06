import axios from 'axios';

import { apiUrl } from '../config';

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
    dispatch({ type: 'AUTH_LOGGED_OUT' });
  } catch (err) {
    dispatch({ type: 'AUTH_LOGGED_OUT' });
  }
};
