const initialState = {
  checkingSession: true,
  isLoggedIn: false,
  account: false,
  error: '',
  resetPasswordSent: false
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

    case 'AUTH_LOGGED_OUT_SUCCESS':
      return { ...initialState, checkingSession: false };

    case 'AUTH_LOGGED_OUT_FAILED': {
      const error = action.err || 'Error logging out';
      return { isLoggedIn: true, error };
    }
    case 'AUTH_FAILED': {
      const error = action.err || 'Error authenticating.';
      return { ...state, error };
    }

    case 'FORGOT_PASSWORD_SENT': {
      return { resetPasswordSent: true };
    }

    case 'FORGOT_PASSWORD_FAILED': {
      return { ...initialState, resetPasswordSent: false };
    }

    default:
      return state;
  }
};
