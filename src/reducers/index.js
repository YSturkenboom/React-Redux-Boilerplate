import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import siteRank from './siteRank';
import register from './register';

const reducers = {
  auth,
  register,
  router,
  siteRank
};

export default combineReducers(reducers);
