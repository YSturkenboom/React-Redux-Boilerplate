import axios from 'axios';

import { apiUrl } from '../config';

export const createNewList = () => async dispatch => {
  console.log('creating new list');
  try {
    await axios.post(`${apiUrl}/lists/create`, {});
    return dispatch({ type: 'REQUEST_SUCCESS' });
  } catch (err) {
    return dispatch({ type: 'REQUEST_FAIL', err: 'oh noooo' });
  }
};

export const getList = () => async dispatch => {
  console.log('get list with id');
  try {
    const result = await axios.get(`${apiUrl}/lists/list`, {});
    return dispatch({ type: 'LISTS_LIST_REQUEST_SUCCESS', result });
  } catch (err) {
    console.log('errrr', err);
    return dispatch({
      type: 'LISTS_LIST_REQUEST_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};

export const getSingleList = id => async dispatch => {
  try {
    const result = await axios.get(`${apiUrl}/lists/read/${id}`, {});
    return dispatch({ type: 'SINGLE_LIST_REQUEST_SUCCESS', result });
  } catch (err) {
    console.log('errrr', err);
    return dispatch({
      type: 'SINGLE_LIST_REQUEST_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};
