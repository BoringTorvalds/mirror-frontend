import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Weather from './../components/Weather';
import { fetchLocationWeather} from './../actions/weather';

class WeatherContainer extends Component{
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(`FETCH WEATHER FROM DALLAS`);
		this.props.dispatch(fetchLocationWeather('Dallas'));
	}

	render() {
		return (
			<div>
				{ this.props.weather.isFetched &&
					<Weather 
						{...this.props.weather} 
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
