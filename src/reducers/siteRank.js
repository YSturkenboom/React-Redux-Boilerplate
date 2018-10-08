const initialState = {
  ranks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST_REQUEST_SUCCESS': {
      const newListId = action.newListId.data._id;
      return { ...state, newListId };
    }
    case 'CREATE_LIST_REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    case 'GET_RANK_FOR_WEBSITE_SUCCESS': {
      // const msg = action.msg || 'Get ranks for sites in list successful.';
      console.log('action', action.result.data.websites[0]);
      return state;
    }
    case 'GET_RANK_FOR_WEBSITE_FAIL': {
      const error = action || 'Error retrieving ranks for sites in list.';
      return { ...state, error };
    }
    case 'GET_TRAFFIC_REQUEST_SUCCESS': {
      console.log('actiones', action);
      const newRanks = [...state.ranks, ...action.ranks];
      return { ranks: newRanks };
    }
    default:
      return state;
  }
};
