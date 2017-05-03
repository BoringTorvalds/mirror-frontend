import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import AnimatedIcon from './AnimatedIcon';
import styled from 'styled-components';


const formatTemperature = (degrees, format) => {
	const formattedDegree = Math.round(degrees);
	return `${formattedDegree}°${format}`;
}

class Weather extends Component {
	constructor(props){
		super(props);
	}

	render = () => {
		const { 
			iconType,
			summary,
			current
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

		return(
			<Grid fluid>
				<Row>
				</Row>
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
					<Text> Arlington, TX </Text>
					<Text>{ summary } </Text>
				</Row>
			</Grid>
		);
	}
}

Weather.propTypes = {
		iconType: PropTypes.string,
		summary: PropTypes.object,
		current: PropTypes.object.isRequired,
		summary: PropTypes.string.isRequired
}

export default Weather;
