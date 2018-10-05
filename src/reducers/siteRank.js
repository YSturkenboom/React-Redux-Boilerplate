const initialState = {
  siteRanks: {
    ranks: [
      {
        _id: 1,
        url: 'google.com',
        rank: 1,
        date: '27/02/2018',
        category: 'Global rank'
      },
      {
        _id: 2,
        url: 'storyofams.com',
        rank: 2,
        date: '27/02/2018',
        category: 'Global rank'
      }
    ]
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SUCCESS': {
      const msg = action.msg || 'Saving site list successful.';
      console.log('-----------------action', action);
      const { ranks } = action.result.data;
      console.log('++++ranks', ranks);
      return { ranks, msg };
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
