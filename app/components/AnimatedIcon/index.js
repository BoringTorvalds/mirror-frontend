import React from 'react';
import styles from './style.css';

export default (props) => {
  const { iconType } = props;

  const sunny = (
	<div className={styles.sunny}>
	  <div className={styles.sun}>
		<div className={styles.rays}> </div>
	  </div>
	</div>
  );

  const cloudy = (
	<div className={styles.icon}>
	  <div className={styles.cloud}> </div>;
	  <div className={styles.cloud}> </div>;
	</div>
  );
  const cloud = (
	<div className={styles.icon}>
	  <div className={styles.cloud}> </div>
	</div>
  );

  const rain = (
	<div className={styles.icon}>
	  <div className={styles.cloud}> </div>
	  <div className={styles.rain}> </div>
	</div>
  );

  const thunderStorm = (
	<div className={styles.icon}>
	  <div className={styles.cloud}></div>
	  <div className={styles.lightning}>
		<div className={styles.bolt}></div>
		<div className={styles.bolt}></div>
	  </div>
	</div>
  );
  switch (iconType){
	case 'clear-night':
	  return cloud;
	case 'rain':
	  return rain;
	case 'sleet':
	case 'snow':
	case 'thunderstorm':
	  return thunderStorm;
	case 'wind':
	case 'fog':
	case 'cloudy':
	case 'partly-cloudy-day':
	case 'partly-cloudy-night':
	case 'clear-day':
	  return cloudy;
	default:
	  return sunny;
  }
}
