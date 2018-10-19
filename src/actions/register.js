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
    return dispatch({ type: 'REGISTER_SUCCESS', account: res.data.account });
  } catch (err) {
    const res = err.response;
    return dispatch({ type: 'REGISTER_FAIL', err: res.data.error });
  }
};
