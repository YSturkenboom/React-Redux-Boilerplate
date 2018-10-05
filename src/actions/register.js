import axios from 'axios';

import { apiUrl } from '../config';

axios.defaults.withCredentials = true;

export const register = (name, company, email, password) => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/auth/register`, {
      name,
      company,
      email,
      password
    });

    dispatch({ type: 'AUTH_REGISTER', account: res.data.account });
  } catch (err) {
    const res = err.response;
    dispatch({ type: 'REGISTER_FAILED', err: res.data.error });
  }
};
