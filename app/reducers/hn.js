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

export const hn = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_HN_REQUEST:
			return { ...state, isFetching: true, isFetched: false };
		case FETCH_HN_SUCCESS:
			return { ...state, isFetching: false, isFetched: true, items: action.items};
		case FETCH_HN_FAILURE:
			return { ...state, isFetching: false , isFetched: false };
		default:
			return state;
	}
}
