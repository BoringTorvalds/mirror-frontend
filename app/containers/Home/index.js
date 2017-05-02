import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import FeedsContainer from './../FeedsContainer';
import WeatherContainer from './../WeatherContainer';
import Clock from './../../components/Clock';
import Setting from './../../components/Setting';
import StockContainer from './../StockContainer';

import styles from './Home.css';
import {
	Grid,
	Col,
	Row
} from 'react-bootstrap';

class Home extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<Grid>
				<Row style={{marginBottom: "50"}}> 
					<Col sm={4} md={4} lg={4}>
						<WeatherContainer />
					</Col>
					<Col smPush={4} mdPush={4} lgPush={4} >
						<Clock />
					</Col>
				</Row>
				<Row>
				</Row>
				<Row>
					<Col sm={7} md={7} lg={7}>
						<FeedsContainer />
					</Col>
					<Col sm={5} md={5} lg={5}>
						<StockContainer />
					</Col>
						{/* <Setting /> */}
				</Row>
			</Grid>
		);
	}
}

export default connect()(Home);
