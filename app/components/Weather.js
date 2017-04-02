import React, { Component, PropTypes } from 'react';
import AnimatedIcon from './AnimatedIcon';
import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';
import styles from './Weather.css';


const formatTemperature = (degrees, format) => {
	const formattedDegree = Math.round(degrees);
	return `${formattedDegree}°${format}`;
}
class Weather extends Component {
	static propTypes = {
		iconType: PropTypes.string,
		summary: PropTypes.object,
		current: PropTypes.object.isRequired,
		summary: PropTypes.string.isRequired
	}

	constructor(props){
		super(props);
	}

	render = () => {
		const { iconType,
			summary,
			current
		} = this.props;

		return(
			<Grid fluid>
				<Row>
				</Row>
				<Row>
					<div className={styles.temperature}>
						{ formatTemperature(current.temperature,'F') }
					</div>
					<AnimatedIcon iconType={iconType} />
				</Row>
				<Row>
					<div className={styles.placeHolder}> </div>
				</Row>
				<Row>
					<p className={styles.text}> Arlington, Tx </p>
					<p className={styles.text}>{ summary } </p>
				</Row>
			</Grid>
		);
	}
}

/**
 * Export
 *
 * @type {Component}
 */
export default Weather;
