import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import siteRank from './siteRank';

const reducers = {
  auth,
  router,
  siteRank
};

export default combineReducers(reducers);
