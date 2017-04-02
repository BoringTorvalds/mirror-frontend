import React, { Component } from 'react';
import WeatherContainer from './WeatherContainer';
import Clock from './../components/Clock';
import HNStories from './../components/HNStories';
import FeedsContainer from './FeedsContainer';
import { hashHistory, Link } from 'react-router';
import styles from './Home.css';
import {
	Grid,
	Col,
	Row
} from 'react-bootstrap';

export default class Home extends Component {
	constructor(props){
		super(props);
	}

	goTo() {
		hashHistory.push("/login");
	}


	render() {
		return (
			<Grid>
				<Row> 
					<Col sm={4} md={4} lg={4}>
						<WeatherContainer />
					</Col>
					<Col smPush={4} mdPush={4} lgPush={4} >
						<Clock />
					</Col>
				</Row>
				<Row>
					<Col sm={6} md={6} lg={6}>
					</Col>
					<Col sm={6} md={6} lg={6}>
						{/* <FeedsContainer /> */}
					</Col>
				</Row>
				<Row>
					<button onClick={ this.goTo }> Login </button>
				</Row>
			</Grid>
		);
	}
}
