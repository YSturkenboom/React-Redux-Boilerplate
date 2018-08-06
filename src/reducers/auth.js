const initialState = {
  checkingSession: true,
  isLoggedIn: false,
  account: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGGED_IN': {
      if (action.account) {
        return { isLoggedIn: true, account: action.account };
      }

      const error = action.err || 'Error loading account.';
      return { ...state, error };
    }

    case 'AUTH_NOT_LOGGED_IN':
      return { checkingSession: false };

    case 'AUTH_LOGGED_OUT':
      return { ...initialState, checkingSession: false };

    case 'AUTH_FAILED': {
      const error = action.err || 'Error authenticating.';
      return { ...state, error };
    }

    default:
      return state;
  }
};
