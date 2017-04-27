import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Weather from './../components/Weather';
import { fetchWeather } from './../actions/weather';

class WeatherContainer extends Component{
	static propTypes = {
		weather: PropTypes.object
	}
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
				{ this.props.weather.isFetched &&
					<Weather {...this.props.weather} /> 
				}
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		weather: state.weather
	}
}

export default connect(mapStateToProps)(WeatherContainer);
