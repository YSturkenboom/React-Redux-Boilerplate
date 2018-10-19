import axios from 'axios';
import { apiUrl } from '../config';

export const getBulkTraffic = (sites, listId) => async dispatch => {
  try {
    dispatch({ type: 'GET_TRAFFIC_PENDING' });
    const result = await axios.put(
      `${apiUrl}/lists/update-websites/${listId}`,
      { sites }
    );
    return dispatch({
      type: 'GET_TRAFFIC_SUCCESS',
      payload: result.data
    });
  } catch (err) {
    const { invalidUrls } = err.response.data.error.data;
    return dispatch({
      type: 'GET_TRAFFIC_FAIL',
      invalidUrls
    });
  }
};

export const getRanksForWebsitesInList = listId => async dispatch => {
  try {
    const { ranks } = await axios.get(`${apiUrl}/lists/read/${listId}`, {})
      .data;
    return dispatch({ type: 'GET_RANKS_FOR_WEBSITES_SUCCESS', ranks });
  } catch (err) {
    return dispatch({
      type: 'GET_RANKS_FOR_WEBSITES_FAIL',
      error: err
    });
  }
};
