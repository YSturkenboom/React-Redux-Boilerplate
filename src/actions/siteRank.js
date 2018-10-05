import axios from 'axios';

import { apiUrl } from '../config';

export const getBulkTraffic = sites => async dispatch => {
  console.log('arrive at action');
  try {
    const ranks = await axios.post(`${apiUrl}/traffic/get-sites-bulk`, {
      sites
    });
    console.log('ranks', ranks);
    return dispatch({ type: 'REQUEST_SUCCESS', ranks });
  } catch (err) {
    return dispatch({ type: 'REQUEST_FAIL', err: 'oh noooo' });
  }
};
