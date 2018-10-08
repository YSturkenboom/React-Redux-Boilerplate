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

export const getRanksForWebsitesInList = listId => async dispatch => {
  try {
    const result = await axios.get(`${apiUrl}/lists/read/${listId}`, {});
    console.log('success bro', listId);
    return dispatch({ type: 'GET_RANK_FOR_WEBSITE_SUCCESS', result });
  } catch (err) {
    console.log('errrr', err);
    return dispatch({
      type: 'GET_RANK_FOR_WEBSITE_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};
