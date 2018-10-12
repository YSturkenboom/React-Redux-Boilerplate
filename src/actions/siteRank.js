import axios from 'axios';
// import { difference } from 'lodash';

import { apiUrl } from '../config';

export const getBulkTraffic = (sites, listId) => async dispatch => {
  try {
    const result = await axios.put(
      `${apiUrl}/lists/update-websites/${listId}`,
      { sites }
    );
    return dispatch({
      type: 'GET_TRAFFIC_REQUEST_SUCCESS',
      ranks: result.data
    });
  } catch (err) {
    const { invalidUrls } = err.response.data.error.data;
    return dispatch({
      type: 'GET_TRAFFIC_REQUEST_FAIL',
      invalidUrls
    });
  }
};

export const getRanksForWebsitesInList = listId => async dispatch => {
  try {
    const result = await axios.get(`${apiUrl}/lists/read/${listId}`, {});
    return dispatch({ type: 'GET_RANK_FOR_WEBSITE_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'GET_RANK_FOR_WEBSITE_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};
