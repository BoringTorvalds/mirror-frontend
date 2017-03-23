import React, { Component } from 'react';
import WeatherContainer from './WeatherContainer';
import HNStories from './../components/HNStories';
import styles from './Home.css';
import { hashHistory, Link } from 'react-router';

export default class Home extends Component {
  constructor(props){
	super(props);
  }

  goToLogin() {
	hashHistory.push('/login') ;
  }


  render() {
	return (
	  <div className={styles.container}>
		<WeatherContainer />
		<HNStories />
		<button onClick={ this.goToLogin }> Login </button>
	  </div>
	);
  }
}
