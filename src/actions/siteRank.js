import axios from 'axios';

import { apiUrl } from '../config';

export const getBulkTraffic = sites => async dispatch => {
  console.log('arrive at action');
  try {
    await axios.post(`${apiUrl}/traffic/getSitesBulk`, {
      sites
    });
    return dispatch({ type: 'REQUEST_SUCCESS' });
  } catch (err) {
    return dispatch({ type: 'REQUEST_FAIL', err: 'oh noooo' });
  }
};
