import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import auth from './auth';
import siteRank from './siteRank';
import lists from './lists';

const reducers = {
  auth,
  router,
  siteRank,
  lists
};

export default combineReducers(reducers);
