import axios from 'axios';
// import { difference } from 'lodash';

import { apiUrl } from '../config';

export const getBulkTraffic = sites => async dispatch => {
  try {
    const result = await axios.post(`${apiUrl}/traffic/get-sites-bulk`, {
      sites
    });
    return dispatch({ type: 'REQUEST_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'REQUEST_FAIL',
      error: 'oh noooo',
      actualErr: err
    });
  }
};
