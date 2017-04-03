import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import FeedsContainer from './FeedsContainer';
import WeatherContainer from './WeatherContainer';
import Clock from './../components/Clock';
import HNStories from './../components/HNStories';
import Setting from './../components/Setting';
import StockContainer from './StockContainer';
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
					<Col sm={5} md={5} lg={5}>
						<StockContainer />
					</Col>
					<Col sm={7} md={7} lg={7}>
						<FeedsContainer />
					</Col>
				</Row>
				<Row>
					{/* <button onClick={ this.goTo }> Login </button> */}
					<Setting />

				</Row>
			</Grid>
		);
	}
}
