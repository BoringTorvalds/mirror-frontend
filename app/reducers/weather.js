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
	  return Object.assign({}, state, {
		isFetching: true,
		isFetched: false
	  });
	case FETCH_WEATHER_SUCCESS:
	  console.log("Wweather");
	  console.log(action);
	  return Object.assign({}, state, action.weather, {
		isFetching: false,
		isFetched: true
	  });
	default:
	  return state;
  }
}
