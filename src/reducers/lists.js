import { remove } from 'lodash';

const initialState = {
  data: [],
  isLoading: true,
  currentListId: null,
  newListId: null
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
      const { data } = action.result;
      const { name } = data;
      return { data, name };
    }

    case 'SINGLE_LIST_REQUEST_FAIL': {
      console.log('singel fail');
      const { data } = action.result;
      return { data, isLoading: false };
    }

    case 'LIST_DELETE_SUCCES': {
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
      const { data } = action.result;
      const { name } = data;
      return { data, name };
    }
    case 'LIST_TITLE_UPDATE_FAIL': {
      console.log('title update fail', action);
      const { data } = action;
      const { name } = data;
      return { data, name };
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
