import {
	FETCH_WEATHER_REQUEST,
	FETCH_WEATHER_SUCCESS,
	FETCH_FULL_WEATHER
} from './../constants/ActionTypes';

const initialState = {
	iconType: null,
	summary: null,
	temparature: null,
	daily: [],
	isFetching: false,
	isFetched: false,
	width: null,
	currentLocation: null,
	height: null
}

export function weather(state = initialState, action){
	switch (action.type) {
		case FETCH_WEATHER_REQUEST:
			return { ...state, isFetching: true, isFetched: false };
		case FETCH_WEATHER_SUCCESS:
			return { ...state, isFetching: false, isFetched: true, ...action.weather };
		case FETCH_FULL_WEATHER:
			return { ...state, ...action.weather }
		default:
			return state;
	}
}
