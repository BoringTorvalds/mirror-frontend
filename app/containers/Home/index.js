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

/**
 * React.Component class represents Home Page
 * Features:
 *	- Weather 
 *	- Stock 
 *	- HN news
 *	- Time
 *
 * @class
 */
class Home extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<Grid>
				<Row style={{marginBottom: "100"}}> 
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
					<Col sm={5} md={5} lg={5}>
						<StockContainer />
					</Col>
					<Col sm={1} md={1} lg={1}>
					</Col>
					<Col sm={6} md={6} lg={6}>
						<FeedsContainer />
					</Col>
				</Row>
				<Row>
					<Setting />
				</Row>
			</Grid>
		);
	}
}

export default connect()(Home);
