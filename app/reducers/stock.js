import {
	FETCH_STOCK_SUCCESS,
	FETCH_STOCK_REQUEST
} from './../constants/ActionTypes';

const initialState = {
	data: null
}

export function stock(state= initialState, action) {
	switch (action.type) {
		case FETCH_STOCK_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isFetched: false
			});

		case FETCH_STOCK_SUCCESS:
			return Object.assign({}, state, action.stock, {
				isFetching: false,
				isFetched: true
			});
		default:
			return state
	}
}
