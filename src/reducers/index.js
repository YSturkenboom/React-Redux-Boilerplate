import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';

const reducers = {
  auth,
  router
};

export default combineReducers(reducers);
