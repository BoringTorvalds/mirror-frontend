import {
  FETCH_HN_REQUEST,
  FETCH_HN_FAILURE,
  FETCH_HN_SUCCESS
} from './../constants/ActionTypes';
const initialState = {
  isFetched: false,
  isFetching: false,
  items: []
}

export function hn(state = initialState, action) {
  switch (action.type) {
	case FETCH_HN_REQUEST:
	  return Object.assign({}, state, {
		isFetching: true,
		isFetched: false
	  });
	case FETCH_HN_SUCCESS:
	  return Object.assign({}, state, {
		items: action.items,
		isFetching: false,
		isFetched: true
	  });
	case FETCH_HN_FAILURE:
	  return Object.assign({}, state, {
		isFetching: false,
		isFetched: false
	  });

	default:
	  return state;
  }
}
