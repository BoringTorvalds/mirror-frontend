import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Weather from './../components/Weather';
import { fetchLocationWeather} from './../actions/weather';

/**
 * React component represents WeatherContainer
 * A container that maps to state.weather and display in Weather Component
 */
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
				{ this.props.isFetched &&
					<Weather 
						{...this.props} 
					/> 
				}
			</div>
		)
	}

}

WeatherContainer.propTypes = {
	/** Icon type of weather */
	iconType: PropTypes.string,
	/** Summary of current weather */
	summary: PropTypes.string,
	/** An object of weather container current temperature */
	current: PropTypes.object.isRequired,
	/** Next 7 days forcast of weather  */
	daily: PropTypes.any,
	/** Current location to look up weather */
	currentLocation: PropTypes.string,
	/** Width of component */
	width: PropTypes.string,
	/** Height of component */
	height: PropTypes.string
};


WeatherContainer.defaultProps = {
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

const mapStateToProps = ({weather}) => {
	return {...weather}
};
export default connect(mapStateToProps)(WeatherContainer);
