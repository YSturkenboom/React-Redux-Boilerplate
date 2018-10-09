import { filter, remove } from 'lodash';

const initialState = {
  data: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST_REQUEST_SUCCESS': {
      return { ...state };
    }
    case 'CREATE_LIST_REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error, isLoading: false };
    }
    case 'LISTS_LIST_REQUEST_SUCCESS': {
      console.log('halloo', action);
      const { data } = action.result;
      console.log('action', action);
      return { ...state, data, isLoading: false };
    }
    case 'LISTS_LIST_REQUEST_FAIL': {
      return { ...state };
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      const { name } = action.result.data;
      return { ...state, name };
    }
    case 'LIST_TITLE_UPDATE_SUCCESS': {
      console.log('title update succes', action.result);
      const { name } = action.result.data;
      return { ...state, currentListName: name };
    }
    case 'LIST_TITLE_UPDATE_FAIL': {
      console.log('title update fail', action);
      const { data } = action;
      const { name } = data;
      return { ...state, currentListName: name };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      console.log('singel fail');
      return { ...state, isLoading: false };
    }
    case 'LIST_DELETE_SUCCES': {
      console.log('succes delete list', action);
      const data = remove(
        state.data,
        el => el._id !== action.result.data.siteListToDelete._id
      );
      return { ...state, data };
    }
    case 'LIST_DELETE_FAIL': {
      console.log('delete singe fail', action);
      const { data } = action.result;
      return { ...state, data, isLoading: false };
    }
    case 'UPDATE_MULTIPLE_WEBSITES_SUCCESS': {
      return state;
    }
    case 'UPDATE_MULTIPLE_WEBSITES_FAIL': {
      return state;
    }
    case 'DELETE_SITE_FROM_LIST_SUCCESS': {
      const { deletedList } = action.result.data;
      const newData = filter(state.data, item => item._id !== deletedList);
      return { ...state, data: newData };
    }
    case 'DELETE_SITE_FROM_LIST_FAIL': {
      return { ...state, err: action.result.err };
    }
    default:
      return state;
  }
};
