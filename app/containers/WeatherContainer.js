import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Weather from './../components/Weather';
import { fetchLocation, fetchWeather } from './../actions/weather';

class WeatherContainer extends Component{
	constructor(props) {
		super(props);
		this.currentLocation = null;
	}

	componentDidMount() {
		const lat = "32.7357";
		const lng = "-97.1081";

		console.log(`FETCH WEATHER FROM DALLAS`);
		fetchLocation('Dallas').then(loc => this.fetchWeather(loc));
	}

	fetchWeather = ({lat,lng,formatted_address}) => {
		if (!lat || !lng || !formatted_address) {
			return;
		}
		const sampleUrl = "https://api.darksky.net/forecast/9e1bfc49cdc03b377f4d00753ff13ada/" + lat +"," + lng;
		console.log(formatted_address);
		console.log(`GOT LOCATION ${formatted_address}`);
		this.currentLocation = formatted_address;
		this.props.dispatch(fetchWeather(sampleUrl));
	}

	render() {
		return (
			<div>
				{ this.props.weather.isFetched &&
					<Weather 
						{...this.props.weather} 
						currentLocation={this.currentLocation}
					/> 
				}
			</div>
		)
	}

}


WeatherContainer.propTypes = {
	weather: PropTypes.object
};
const mapStateToProps = (state) => {
	return {
		weather: state.weather
	}
}

export default connect(mapStateToProps)(WeatherContainer);
