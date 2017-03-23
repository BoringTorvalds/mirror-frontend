import React, { Component } from 'react';
import WeatherContainer from './WeatherContainer';
import Clock from './../components/Clock';
import HNStories from './../components/HNStories';
import styles from './Home.css';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
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
	  <Grid>
		<Row> 
		  <Col sm={6} md={6} lg={6} pull>
			<WeatherContainer />
		  </Col>
		  <Col sm={2} md={2} lg={2} >
		  </Col>
		  <Col sm={4} md={4} lg={4} >
			<Clock />
		  </Col>
		</Row>
		<Row>
		  <Col sm={6} md={6} lg={6}>
			<HNStories />
		  </Col>
		</Row>
		<Row>
		  <button onClick={ this.goToLogin }> Login </button>
		</Row>
	  </Grid>
	);
  }
}
