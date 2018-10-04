import axios from 'axios';

import { apiUrl } from '../config';

axios.defaults.withCredentials = true;

export const getBulkTraffic = sites => async dispatch => {
  try {
    await axios.post(`${apiUrl}/traffic/getSitesBulk`, {
      sites
    });
    dispatch({ type: 'REQUEST_SUCCESS' });
  } catch (err) {
    const res = err.response;
    dispatch({ type: 'REQUEST_FAIL', err: res.data.error });
  }
};

export const getBulkTrafsdsfic = sites => async dispatch => {
  try {
    await axios.post(`${apiUrl}/traffic/getSitesBulk`, {
      sites
    });
    dispatch({ type: 'REQUEST_SUCCESS' });
  } catch (err) {
    const res = err.response;
    dispatch({ type: 'REQUEST_FAIL', err: res.data.error });
  }
};
