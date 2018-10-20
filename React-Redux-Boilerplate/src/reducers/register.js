const initialState = {
  isRegistered: false,
  account: false, // ???
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS': {
      if (action.account) {
        return { isRegistered: true, account: action.account };
      }

      const error = action.err || 'Error loading account.';
      return { ...state, error };
    }

    case 'AUTH_NOT_LOGGED_IN':
      return { checkingSession: false };

    case 'REGISTER_FAIL': {
      const error = action.err || 'Error registering.';
      return { ...state, error };
    }

    default:
      return state;
  }
};
