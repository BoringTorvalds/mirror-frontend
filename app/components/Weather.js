import React, { Component, PropTypes } from 'react';
import AnimatedIcon from './AnimatedIcon';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import styles from './Weather.css';


class Weather extends Component {
  constructor(props){
	super(props);
  }

  static propTypes = {
	iconType: PropTypes.string,
	summary: PropTypes.object,
	current: PropTypes.object.isRequired,
	summary: PropTypes.string.isRequired
  }

  render = () => {
	const { iconType,
	  summary,
	  current
	} = this.props;

	return(
	  <Grid fluid>
		<Row>
		  <AnimatedIcon iconType={iconType} />
		</Row>
		<Row>
		</Row>
		<Row>
		  <div className={styles.temperature}>
			{current.temperature }° 
		  </div>
		</Row>
		<Row>
		</Row>
		<Row>
		  <p>{ summary } </p>
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
