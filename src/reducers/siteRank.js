const initialState = {
  ranks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SUCCESS': {
      const msg = action.msg || 'Saving site list successful.';
      const { ranks } = action.result.data;
      return { ranks: [...state.ranks, ...ranks], msg };
    }
    case 'REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    case 'GET_RANK_FOR_WEBSITE_SUCCESS': {
      // const msg = action.msg || 'Get ranks for sites in list successful.';
      console.log('action', action.result.data.websites[0]);
      return state;
    }
    case 'GET_RANK_FOR_WEBSITE_FAIL': {
      const error = action.err || 'Error retrieving ranks for sites in list.';
      return { ...state, error };
    }
    default:
      return state;
  }
};
