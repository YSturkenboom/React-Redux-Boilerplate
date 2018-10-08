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

export const getRanksForWebsitesInList = websiteIds => async dispatch => {
  try {
    console.log('websiteIds', websiteIds);
    // const result = await axios.get(`${apiUrl}/lists/read/${id}`, {});
    return dispatch({ type: 'GET_RANK_FOR_WEBSITE_SUCCESS' });
  } catch (err) {
    console.log('errrr', err);
    return dispatch({
      type: 'GET_RANK_FOR_WEBSITE_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};
