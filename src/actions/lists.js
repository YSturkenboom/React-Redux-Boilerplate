import axios from 'axios';

import { apiUrl } from '../config';

export const deleteSiteFromList = (siteId, listId) => async dispatch => {
  try {
    await axios.delete(
      `${apiUrl}/lists/delete-website/${listId}/${siteId}`,
      {}
    );
    return dispatch({ type: 'DELETE_SITE_FROM_LIST_SUCCESS', siteId });
  } catch (err) {
    return dispatch({ type: 'DELETE_SITE_FROM_LIST_FAIL', err });
  }
};

export const createNewList = () => async dispatch => {
  try {
    const newListId = await axios.post(`${apiUrl}/lists/create`, {});
    return dispatch({ type: 'CREATE_LIST_SUCCESS', newListId });
  } catch (err) {
    return dispatch({ type: 'CREATE_LIST_FAIL', err });
  }
};

export const getList = () => async dispatch => {
  try {
    const result = await axios.get(`${apiUrl}/lists/list`, {});
    return dispatch({ type: 'LISTS_LIST_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'LISTS_LIST_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};

export const getSingleList = id => async dispatch => {
  try {
    const result = await axios.get(`${apiUrl}/lists/read/${id}`, {});
    return dispatch({ type: 'LIST_READ_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'LIST_READ_FAIL',
      err
    });
  }
};

export const updateMultipleWebsites = rankingObjects => async dispatch => {
  try {
    const result = await axios.put(`${apiUrl}/lists/update-multiple-websites`, {
      rankingObjects
    });
    return dispatch({ type: 'UPDATE_MULTIPLE_WEBSITES_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'UPDATE_MULTIPLE_WEBSITES_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};

export const deleteList = id => async dispatch => {
  try {
    await axios.delete(`${apiUrl}/lists/delete-list/${id}`, {});
    return dispatch({ type: 'LIST_DELETE_SUCCESS', id });
  } catch (err) {
    return dispatch({
      type: 'LIST_DELETE_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};

export const updateTitle = (id, name) => async dispatch => {
  try {
    const result = await axios.put(`${apiUrl}/lists/update-name/${id}`, {
      name
    });
    return dispatch({ type: 'LIST_TITLE_UPDATE_SUCCESS', result });
  } catch (err) {
    return dispatch({
      type: 'LIST_TITLE_UPDATE_FAIL',
      error: 'oh noooo',
      realErr: err
    });
  }
};

export const refreshList = listId => async dispatch => {
  try {
    dispatch({ type: 'LIST_REFRESH_PENDING' });
    const result = await axios.put(
      `${apiUrl}/lists/refresh-websites/${listId}`,
      {}
    );
    return dispatch({ type: 'LIST_REFRESH_SUCCESS', result });
  } catch (error) {
    return dispatch({ type: 'LIST_REFRESH_FAIL', error });
  }
};
