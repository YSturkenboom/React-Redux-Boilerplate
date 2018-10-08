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
      return { data };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      console.log('singel fail');
      const { data } = action.result;
      return { data, isLoading: false };
    }
    case 'LIST_DELETE_SUCCES': {
      console.log('delete single req');
      console.log(action.result, 'result');
      console.log('currentdata', state.data.length);
      const data = remove(state.data, el => {
        console.log(el._id, action.result.data.siteListToDelete._id);
        return el._id !== action.result.data.siteListToDelete._id;
      });
      console.log('newdata', data.length);
      return { data };
    }
    case 'LIST_DELETE_FAIL': {
      console.log('delete singe fail', action);
      const { data } = action.result;
      return { data, isLoading: false };
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
