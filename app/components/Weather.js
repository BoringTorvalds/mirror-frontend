import React, { Component, PropTypes } from 'react';
import AnimatedIcon from './AnimatedIcon';
import styles from './Weather.css';

const propTypes = {
  iconType: PropTypes.string,
  temparature: PropTypes.number.isRequired,
  summary: PropTypes.string.isRequired
};

class Weather extends Component {
  constructor(props){
	super(props);
  }

  render(){
	const { iconType,
	  summary,
	  temparature
	} = this.props;

	return(
	  <div className={styles.container}>
		<div className={styles.topSection}>
		  <div className={styles.temperature}>{ temparature }° </div>
		  <AnimatedIcon iconType={iconType} />
		</div>
		<div className={styles.bottomSection}>
		  { summary }
		</div>
	  </div>
	);
  }
}

Weather.propTypes = propTypes;

export default Weather;
