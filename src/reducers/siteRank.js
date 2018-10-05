const initialState = {
  ranks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SUCCESS': {
      const msg = action.msg || 'Saving site list successful.';
      console.log('-----------------action', action);
      const { ranks } = action.result.data;
      console.log('++++ranks', ranks);
      return { ranks: [...state.ranks, ...ranks], msg };
    }
    case 'REQUEST_FAIL': {
      console.log('action fsil', action);
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    default:
      return state;
  }
};
