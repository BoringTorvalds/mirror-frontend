import { 
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
	FETCH_WEATHER_FAILURE,
	FETCH_FULL_WEATHER
} from './../constants/ActionTypes';
import { GOOGLE_MAP_API } from './../constants/config';


const parseWeatherObject = (d,formatted_address) => { 
	  console.log(d);
	  const days = d.daily.data;
	  const weather =  {
		  current: d.currently,
		  summary: d.hourly.summary,
		  daily: [...days],
			iconType: d.currently.icon,
			currentLocation: formatted_address
	  };
	  return weather;
}
const fetchWeatherRequest = () => {
  return {
	type: FETCH_WEATHER_REQUEST
  }
}

const fetchWeatherSuccess = (weather) => {
	console.log(weather);
  return {
	type: FETCH_WEATHER_SUCCESS,
	weather
  }
}

const fetchWeatherFailure = (error) => {
  return {
	type: FETCH_WEATHER_FAILURE,
	error
  }
}

export const fetchWeather = ({lat,lng,formatted_address}) => {
	const url = "https://api.darksky.net/forecast/9e1bfc49cdc03b377f4d00753ff13ada/" + lat +"," + lng;
  console.log("Triggered");
  return dispatch => {
	dispatch(fetchWeatherRequest);
	return fetch(url)
	  .then(res => res.json())
	  .then(json => dispatch(fetchWeatherSuccess(parseWeatherObject(json,formatted_address))))
	  .catch(error => dispatch(fetchWeatherFailure(error)))
  }
}

/**
 * Parse Location from Google Map API
 * @params {Array} results objects
 *
 * @return {Object} Location
 *	@return {Number} Location.lat
 *	@return {Number} Location.lng
 */
const parseLocationObject = ({results}) => {
	if (results.length > 0) {
		return { ...results[0].geometry.location, formatted_address: results[0].formatted_address};
	} 
	return {formatted_address:null, lng:null, lat: null};
}
export async function fetchLocation(location) {
	try {
	let response = await fetch(GOOGLE_MAP_API + location);
	let locationObj = await response.json();
	return parseLocationObject(locationObj);
	} catch(error){
		return error;
	}
}

export function fetchLocationWeather(location) {
	return dispatch => {
		fetchLocation(location).then((loc) => {
			dispatch(fetchWeather(loc));
		});
	}
}

export function fetchFullWeather({width,height}) {
	return {
		type: FETCH_FULL_WEATHER,
		weather: {
			width: width,
			height: height
		}
	}
}
