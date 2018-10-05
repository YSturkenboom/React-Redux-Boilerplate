const initialState = {
  data: [
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
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SUCCESS': {
      console.log('action success', action);
      const msg = action.msg || 'Saving site list successful.';
      console.log('red: old state', state);
      const newData = [...state.data, ...action.ranks];
      console.log(newData);
      const newState = state;
      newState.data = newData;
      return { state: newState, msg };
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
