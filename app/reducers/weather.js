import {
	FETCH_WEATHER_REQUEST,
	FETCH_WEATHER_SUCCESS
} from './../constants/ActionTypes';

const initialState = {
	iconType: null,
	summary: null,
	temparature: null,
	isFetching: false,
	isFetched: false
}

export function weather(state = initialState, action){
	switch (action.type) {
		case FETCH_WEATHER_REQUEST:
			return { ...state, isFetching: true, isFetched: false };
		case FETCH_WEATHER_SUCCESS:
			return { ...state, isFetching: false, isFetched: true, ...action.weather };
		default:
			return state;
	}
}
