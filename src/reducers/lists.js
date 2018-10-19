import { remove } from 'lodash';

const initialState = {
  data: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST_SUCCESS': {
      return { ...state };
    }

    case 'CREATE_LIST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error, isLoading: false };
    }

    case 'LISTS_LIST_SUCCESS': {
      const { data } = action.result;
      return { ...state, data, isLoading: false };
    }

    case 'LISTS_LIST_FAIL': {
      return { ...state };
    }

    case 'LIST_READ_SUCCESS': {
      const { name } = action.result.data;
      return { ...state, name };
    }

    case 'LIST_READ_FAIL': {
      return { ...state, isLoading: false };
    }

    case 'LIST_TITLE_UPDATE_SUCCESS': {
      const { name } = action.result.data;
      return { ...state, currentListName: name };
    }

    case 'LIST_TITLE_UPDATE_FAIL': {
      return { ...state };
    }

    case 'LIST_DELETE_SUCCESS': {
      const data = remove(state.data, el => el._id !== action.id);
      return { ...state, data };
    }

    case 'LIST_DELETE_FAIL': {
      return { ...state, isLoading: false };
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
