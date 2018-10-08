const initialState = {
  data: [],
  isLoading: true,
  currentListId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LISTS_LIST_REQUEST_SUCCESS': {
      console.log('halloo', action);
      const { data } = action.result;
      return { data, isLoading: false };
    }
    case 'LISTS_LIST_REQUEST_FAIL': {
      return {};
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      const { data } = action.result;
      return { data, isLoading: false };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      return state;
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
