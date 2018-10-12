import { filter, sortBy } from 'lodash';

const initialState = {
  ranks: [],
  currentListId: null,
  currentListName: null,
  invalidUrls: []
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
      return { ...state, ranks: websites };
    }
    case 'GET_RANK_FOR_WEBSITE_FAIL': {
      const error = action || 'Error retrieving ranks for sites in list.';
      return { ...state, error };
    }
    case 'GET_TRAFFIC_REQUEST_SUCCESS': {
      const newRanks = sortBy([...state.ranks, ...action.ranks], 'rank');
      return { ...state, ranks: newRanks };
    }
    case 'GET_TRAFFIC_REQUEST_FAIL': {
      const { invalidUrls } = action;
      return { ...state, invalidUrls };
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      const { _id, websites } = action.result.data;
      console.log('fuck', action);
      return { ...state, ranks: websites, currentListId: _id };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      return { ...state, isLoading: false };
    }
    case 'DELETE_SITE_FROM_LIST_SUCCESS': {
      const websiteId = action.deletedList.data;
      const ranks = filter(state.ranks, item => item._id !== websiteId);
      return { ...state, ranks };
    }
    case 'DELETE_SITE_FROM_LIST_FAIL': {
      return { ...state };
    }
    case 'LIST_REFRESH_SUCCESS': {
      const { ranks } = action.result.data;
      return { ...state, isLoading: false, ranks };
    }
    default:
      return state;
  }
};
