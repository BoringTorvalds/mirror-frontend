import {
	FETCH_STOCK_SUCCESS,
	FETCH_STOCK_REQUEST
} from './../constants/ActionTypes';

const initialState = {
	data: null
};

export function stock(state= initialState, action) {
	switch (action.type) {
		case FETCH_STOCK_REQUEST:
			return { ...state, isFetching: true, isFetched: false };
		case FETCH_STOCK_SUCCESS:
			return { ...state, isFetching: false, isFetched: true, ...action.stock };
		default:
			return state
	}
}
