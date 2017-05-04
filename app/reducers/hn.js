import {
	FETCH_HN_REQUEST, 
	FETCH_HN_FAILURE, 
	FETCH_HN_SUCCESS,
	SHOW_NEXT_PAGE,
	SHOW_PREV_PAGE
} from './../constants/ActionTypes';
import { PAGE_SIZE } from  './../constants/config';

const initialState = {
	isFetched: false,
	isFetching: false,
	items: [],
	pagination: {
		offSet: 0,
		pageSize: PAGE_SIZE
	}
}

export const hn = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_HN_REQUEST:
			return { ...state, isFetching: true, isFetched: false };
		case FETCH_HN_SUCCESS:
			return { ...state, isFetching: false, isFetched: true, items: action.items};
		case FETCH_HN_FAILURE:
			return { ...state, isFetching: false , isFetched: false };
		case SHOW_NEXT_PAGE:
			return showPagination(state,1);
		case SHOW_PREV_PAGE:
			return showPagination(state,-1);
		default:
			return state;
	}
}

const showPagination = (state, inc) => {
	let {pagination} = state;
	pagination.offSet += inc;
	if (pagination.offSet <0){
		pagination.offSet = 0;
	}

	return { ...state, pagination: pagination };
}
