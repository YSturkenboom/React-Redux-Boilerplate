const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SUCCESS': {
      const msg = action.msg || 'Saving site list successful.';
      return { ...state, msg };
    }
    case 'REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    default:
      return state;
  }
};
