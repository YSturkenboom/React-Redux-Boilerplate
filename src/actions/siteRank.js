import axios from 'axios';

import { apiUrl } from '../config';

export const getBulkTraffic = sites => async dispatch => {
  console.log('arrive at action');
  try {
    const result = await axios.post(`${apiUrl}/traffic/get-sites-bulk`, {
      sites
    });
    console.log('result', result);
    return dispatch({ type: 'REQUEST_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'REQUEST_FAIL',
      error: 'oh noooo',
      actualErr: err
    });
  }
};
