import { filter, sortBy } from 'lodash';

const initialState = {
  stats: [],
  currentListId: null,
  currentListName: null,
  invalidUrls: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_LIST_REQUEST_SUCCESS': {
      const currentListId = action.newListId.data._id;
      return { ...state, currentListId };
    }
    case 'CREATE_LIST_REQUEST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }
    case 'GET_RANK_FOR_WEBSITE_SUCCESS': {
      const { websites } = action.result.data;
      return { ...state, ranks: websites, isLoading: false };
    }
    case 'GET_RANK_FOR_WEBSITE_FAIL': {
      const error = action || 'Error retrieving ranks for sites in list.';
      return { ...state, error, isLoading: false };
    }
    case 'GET_TRAFFIC_REQUEST_SUCCESS': {
      const newStats = sortBy(
        [...state.stats, ...action.payload],
        'globalRank'
      );
      return { ...state, stats: newStats, isLoading: false };
    }
    case 'GET_TRAFFIC_REQUEST_FAIL': {
      const { invalidUrls } = action;
      return { ...state, invalidUrls, isLoading: false };
    }
    case 'GET_TRAFFIC_REQUEST_PENDING': {
      return { ...state, isLoading: true };
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      const { _id, websites } = action.result.data;
      return {
        ...state,
        stats: websites,
        currentListId: _id,
        isLoading: false
      };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      return { ...state, isLoading: false };
    }
    case 'DELETE_SITE_FROM_LIST_SUCCESS': {
      const stats = filter(state.stats, item => item._id !== action.siteId);
      return { ...state, stats };
    }
    case 'DELETE_SITE_FROM_LIST_FAIL': {
      return { ...state };
    }
    case 'LIST_REFRESH_SUCCESS': {
      const { stats } = action.result.data;
      return { ...state, isLoading: false, stats };
    }
    default:
      return state;
  }
};
