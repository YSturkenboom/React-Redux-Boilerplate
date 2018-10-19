import axios from 'axios';

import { apiUrl } from '../config';

axios.defaults.withCredentials = true;

export const register = (
  firstName,
  lastName,
  company,
  email
) => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/accounts/register`, {
      firstName,
      lastName,
      company,
      email
    });
    return dispatch({ type: 'AUTH_REGISTER', account: res.data.account });
  } catch (err) {
    const res = err.response;
    return dispatch({ type: 'REGISTER_FAILED', err: res.data.error });
  }
};
