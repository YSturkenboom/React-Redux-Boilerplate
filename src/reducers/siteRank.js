import { filter, sortBy } from 'lodash';

const initialState = {
  ranks: [],
  currentListId: null,
  currentListName: null
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
      return { ...state };
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      const { _id } = action.result.data;
      return { ...state, currentListId: _id };
    }
    case 'SINGLE_LIST_REQUEST_FAIL': {
      console.log('singel fail');
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
    default:
      return state;
  }
};
