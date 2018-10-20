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
    case 'CREATE_LIST_SUCCESS': {
      const currentListId = action.newListId.data._id;
      return { ...state, currentListId };
    }

    case 'CREATE_LIST_FAIL': {
      const error = action.err || 'Error retrieving site ranks.';
      return { ...state, error };
    }

    case 'GET_RANKS_FOR_WEBSITES_SUCCESS': {
      const { websites } = action.result.data;
      return { ...state, ranks: websites, isLoading: false };
    }

    case 'GET_RANKS_FOR_WEBSITES_FAIL': {
      const error = action.error || 'Error retrieving ranks for sites in list.';
      return { ...state, error, isLoading: false };
    }

    case 'GET_TRAFFIC_SUCCESS': {
      const newStats = sortBy(
        [...state.stats, ...action.payload],
        'globalRank'
      );
      return { ...state, stats: newStats, isLoading: false };
    }

    case 'GET_TRAFFIC_FAIL': {
      const { invalidUrls } = action;
      return { ...state, invalidUrls, isLoading: false };
    }

    case 'GET_TRAFFIC_PENDING': {
      return { ...state, isLoading: true };
    }

    case 'LIST_READ_SUCCESS': {
      const { _id, websites } = action.result.data;
      return {
        ...state,
        stats: websites,
        currentListId: _id,
        isLoading: false
      };
    }

    case 'LIST_READ_FAIL': {
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
      const stats = action.result.data;
      return { ...state, isLoading: false, stats };
    }

    case 'LIST_REFRESH_FAIL': {
      return { ...state, isLoading: false };
    }

    case 'LIST_REFRESH_PENDING': {
      return { ...state, isLoading: true };
    }

    default:
      return state;
  }
};
