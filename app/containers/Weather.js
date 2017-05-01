import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { 
	WEATHER_API_ENDPOINT,
	DEFAULT_LAT,
	DEFAULT_LNG
} from './../constants/config';

import { fetchWeather } from './../actions/weather';
import Weather from './../components/Weather';

class WeatherContainer extends Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const sampleUrl = WEATHER_API_ENDPOINT + DEFAULT_LAT +"," + DEFAULT_LNG;
		console.log(`FETCH WEATHER FROM ${sampleUrl}`);
		this.props.dispatch(fetchWeather(sampleUrl));
	}

	render() {
		return (
			<div>
				{ this.props.weather.isFetched &&
					<Weather {...this.props.weather} /> 
				}
			</div>
		)
	}

}
Weather.propTypes = {
	weather: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		weather: state.weather
	}
}

export default connect(mapStateToProps)(WeatherContainer);
