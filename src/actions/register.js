import axios from 'axios';

import { apiUrl } from '../config';

axios.defaults.withCredentials = true;

export const register = (
  firstName,
  lastName,
  company,
  email,
  password
) => async dispatch => {
  try {
    const res = await axios.post(`${apiUrl}/accounts/register`, {
      firstName,
      lastName,
      company,
      email,
      password
    });
    console.log(firstName, lastName, company, email, password);
    console.log(res);
    dispatch({ type: 'AUTH_REGISTER', account: res.data.account });
  } catch (err) {
    const res = err.response;
    console.log(res);
    console.log(firstName, lastName, company, email, password);
    dispatch({ type: 'REGISTER_FAILED', err: res.data.error });
  }
};
