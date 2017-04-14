import axios from 'axios';
import {
	FETCH_STOCK_REQUEST,
	FETCH_STOCK_FAILURE,
	FETCH_STOCK_SUCCESS
} from './../constants/ActionTypes';

export const fetchStockRequest = () => {
	return {
		type: FETCH_STOCK_REQUEST
	}
}

export const fetchStockSuccess = (stock) => {
	return {
		type: FETCH_STOCK_SUCCESS,
		stock
	}
}

/**
 * Fetch stock given a stock company code
 * @param { String } stockName : stock code of a company ('AAPL')
 *
 */
export const fetchStock = (stockName) => {
	let url = 'http://dev.markitondemand.com/Api/v2/InteractiveChart/json';
	if (!stockName) {
		stockName = 'AAPL';
	}
	const params = {  
		parameters: {
			Normalized: false,
			NumberOfDays: 365,
			DataPeriod: "Day",
			Elements: [
			{
				Symbol: stockName,
				Type: "price",
				Params: ["ohlc"] //ohlc, c = close only
			},
			{
				Symbol: stockName,
				Type: "volume"
			}
			]
		}
	};
	return dispatch => {
		dispatch(fetchStockRequest());
    setTimeout(() => {		
		return axios.get(url, {
			params: params
		})
		.then(json => dispatch(fetchStockSuccess(json)))
		.catch(err => dispatch(fetchStockFailure(err)));
		},2000);
	}
}

