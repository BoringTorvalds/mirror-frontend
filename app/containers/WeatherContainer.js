import React, { Component, PropTypes } from 'react';
import Weather from './../components/Weather';
import { connect } from 'react-redux';
import { fetchWeather } from './../actions/weather';

const propTypes = {
  weather: PropTypes.object
}

const getWeather = (state) => {
  return state.weather;
}
class WeatherContainer extends Component{

  constructor(props) {
	super(props);
  }

  componentDidMount() {
	const lat = "32.7357";
	const lng = "-97.1081";

	const sampleUrl = "https://api.darksky.net/forecast/9e1bfc49cdc03b377f4d00753ff13ada/" + lat +"," + lng;
	console.log(`FETCH WEATHER FROM ${sampleUrl}`);
	this.props.dispatch(fetchWeather(sampleUrl));
  }

  render() {
	return (
	  <div>
		{ this.props.weather.isFetched && <Weather {...this.props.weather} /> }
	  </div>
	)
  }

}

const mapStateToProps = (state) => {
  return {
	weather: getWeather(state)
  }
}

export default connect(mapStateToProps)(WeatherContainer);