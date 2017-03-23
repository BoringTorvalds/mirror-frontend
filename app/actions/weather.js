import { 
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE
} from './../constants/ActionTypes';


const parseWeatherObject = (d) => { 
	  console.log(d);
	  const days = d.daily.data;
	  const weather =  {
		  current: d.currently,
		  summary: d.hourly.summary,
		  daily: [...days],
		  iconType: d.currently.icon
	  };
	  return weather;
}
export const fetchWeatherRequest = () => {
  return {
	type: FETCH_WEATHER_REQUEST
  }
}

export const fetchWeatherSuccess = (weather) => {
  return {
	type: FETCH_WEATHER_SUCCESS,
	weather
  }
}

export const fetchWeatherFailure = (error) => {
  return {
	type: FETCH_WEATHER_FAILURE,
	error
  }
}

export const fetchWeather = (url) => {
  console.log("Triggered");
  return dispatch => {
	dispatch(fetchWeatherRequest);
	return fetch(url)
	  .then(res => res.json())
	  .then(json => dispatch(fetchWeatherSuccess(parseWeatherObject(json))))
	  .catch(error => dispatch(fetchWeatherFailure(error)))
  }
}
