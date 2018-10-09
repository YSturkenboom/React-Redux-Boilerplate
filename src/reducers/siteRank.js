const initialState = {
  ranks: [],
  currentListId: null,
  currentListName: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST_REQUEST_SUCCESS': {
      const currentListId = action.newListId.data._id;
      return { ...state, currentListId };
    }
    case 'CREATE_LIST_REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    case 'GET_RANK_FOR_WEBSITE_SUCCESS': {
      const { websites } = action.result.data;
      return { ...state, ranks: websites };
    }
    case 'GET_RANK_FOR_WEBSITE_FAIL': {
      const error = action || 'Error retrieving ranks for sites in list.';
      return { ...state, error };
    }
    case 'GET_TRAFFIC_REQUEST_SUCCESS': {
      console.log('actiones', action);
      const newRanks = [...state.ranks, ...action.ranks];
      return { ...state, ranks: newRanks };
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      const { _id } = action.result.data;
      return { ...state, currentListId: _id };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      console.log('singel fail');
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
