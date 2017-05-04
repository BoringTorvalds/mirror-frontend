import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AnimatedIcon from './AnimatedIcon';
import StaticWeatherIcon from './StaticWeatherIcon';
import styled from 'styled-components';


const formatTemperature = (degrees, format) => {
	const formattedDegree = Math.round(degrees);
	return `${formattedDegree}°${format}`;
}

const DAYS_IN_WEEKS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

class Weather extends Component {
	constructor(props){
		super(props);
		this.currentDayOfWeek = this.getDayOfWeek();
	}

	/**
	 * Get current day in week
	 * 
	 * @return {number} index of day in DAY_IN_WEEKS
	 */
	getDayOfWeek = () => {
		const currentDate = new Date();
		return currentDate.getDay();
	}

	renderDaily(days) {
		console.log(days);
		const DailyItem = styled.div`
			display: inline-block;
			width: 400px;
			height: 100px;
			border-bottom: solid 0.5px #fff;
			padding-bottom: 2px;
			margin-right: 50px;
		`;
		const DayText = styled.h4`
			float: left;
		`;
		const TempText = styled.h5`
			float: right;
		`;
		const TextAlign = styled.h5`
			text-align: center;
		`;
		const dailyForcast = days.map((each,index) => {
			const dIndex = this.currentDayOfWeek + index;
			const d = DAYS_IN_WEEKS[dIndex % 7];
			const averageTemp = formatTemperature((each.temperatureMin + each.temperatureMax)/2, "F");
			return (
				<DailyItem>
					<DayText> {d} <br />
						<StaticWeatherIcon iconType={each.icon} />
					</DayText>
					<TextAlign> {each.summary} </TextAlign>
					<TempText> 
						{averageTemp}  <br />
					</TempText>
				</DailyItem>
			);
		});

		return dailyForcast;
	}

	render = () => {
		const { 
			iconType,
			summary,
			current,
			currentLocation,
			daily,
			width, 
			height
		} = this.props;

		const Temperature = styled.div`
			font-size: -webkit-xxx-large;
			z-index: 2;
			position: relative;
			top: 1.0em;
		`;

		const PlaceHolder = styled.div`
			padding: 1.5em 2em;
		`;

		const Text = styled.p`
			text-align: center;
		`;

		let viewStyle = null;
		if (width != null && height != null){
			viewStyle = {
				width: `${this.props.width}`,
				height: `${this.props.height}`
			};
		}

		const MainContainer = styled.div`
			max-width: 500px;
		`;

		return(
			<Grid fluid style={viewStyle}>
				<Row>
				</Row>
				<MainContainer>
				<Row>
					<Temperature>
						{ formatTemperature(current.temperature,'F') }
					</Temperature>
					<AnimatedIcon iconType={iconType} />
				</Row>
				<Row>
					<PlaceHolder> </PlaceHolder>
				</Row>
				<Row>
					<Text> { currentLocation }</Text>
					<Text>{ summary } </Text>
				</Row>
			</MainContainer>
				{ width && 
					height &&
					<Row style={{marginTop: "50px"}}>
						{ this.renderDaily(daily)}
					</Row>
					}
				</Grid>
		);
	}
}

Weather.propTypes = {
	iconType: PropTypes.string,
	summary: PropTypes.object,
	current: PropTypes.object.isRequired,
	summary: PropTypes.string.isRequired,
	daily: PropTypes.any,
	currentLocation: PropTypes.string,
	width: PropTypes.string,
	height: PropTypes.string
};

export default Weather;
