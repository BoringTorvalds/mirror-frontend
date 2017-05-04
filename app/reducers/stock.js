import {
	FETCH_STOCK_SUCCESS,
	FETCH_STOCK_REQUEST,
	FETCH_STOCK_SYMBOL
} from './../constants/ActionTypes';

const initialState = {
	title: 'APPLE',
	symbol: 'AAPL',
	exchange: 'NASDAQ',
	data: null
};

export function stock(state= initialState, action) {
	switch (action.type) {
		case FETCH_STOCK_SYMBOL:
			return { ...state, ...action.stock };
		case FETCH_STOCK_REQUEST:
			return { ...state, isFetching: true, isFetched: false};
		case FETCH_STOCK_SUCCESS:
			return { ...state, isFetching: false, isFetched: true, data: action.stock.data };
		default:
			return state
	}
}
