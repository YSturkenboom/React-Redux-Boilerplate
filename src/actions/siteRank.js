import axios from 'axios';

import { apiUrl } from '../config';

export const getBulkTraffic = sites => async dispatch => {
  console.log('arrive at action');
  try {
    const result = await axios.post(`${apiUrl}/traffic/get-sites-bulk`, {
      sites
    });
    console.log('ranks', result.data.ranks);
    const { ranks } = result.data;
    return dispatch({ type: 'REQUEST_SUCCESS', ranks });
  } catch (err) {
    return dispatch({
      type: 'REQUEST_FAIL',
      error: 'oh noooo',
      actualErr: err
    });
  }
};
