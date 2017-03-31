import React, { Component, PropTypes } from 'react';
import AnimatedIcon from './AnimatedIcon';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import styles from './Weather.css';


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
		  <div className={styles.temperature}>
			{current.temperature }° 
		  </div>
		</Row>
		<Row>
		  <div className={styles.placeHolder}>
		  </div>
		</Row>
		<Row>
		  <AnimatedIcon iconType={iconType} />
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
