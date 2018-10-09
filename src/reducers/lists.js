import { remove } from 'lodash';

const initialState = {
  data: [],
  isLoading: true,
  currentListId: null,
  newListId: null,
  name: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST_REQUEST_SUCCESS': {
      const newListId = action.newListId.data._id;
      console.log('reducers succes');
      return { ...state, newListId };
    }
    case 'CREATE_LIST_REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    case 'LISTS_LIST_REQUEST_SUCCESS': {
      console.log('halloo', action);
      const { data } = action.result;
      return { data, isLoading: false };
    }
    case 'LISTS_LIST_REQUEST_FAIL': {
      return {};
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      console.log('singel req');
      const { websites, name } = action.result.data;
      console.log('singel ist', action.result);
      return { data: websites, name };
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
      return { data };
    }
    case 'LIST_DELETE_FAIL': {
      console.log('delete singe fail', action);
      const { data } = action.result;
      return { data, isLoading: false };
    }

    case 'LIST_TITLE_UPDATE_SUCCESS': {
      console.log('title update succes', action.result);
      const { name } = action.result.data;
      return { ...state, name };
    }
    case 'LIST_TITLE_UPDATE_FAIL': {
      console.log('title update fail', action);
      const { data } = action;
      const { name } = data;
      return { ...state, name };
    }

    case 'UPDATE_MULTIPLE_WEBSITES_SUCCESS': {
      return state;
    }
    case 'UPDATE_MULTIPLE_WEBSITES_FAIL': {
      return state;
    }
    default:
      return state;
  }
};
