import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import FeedsContainer from './FeedsContainer';
import WeatherContainer from './WeatherContainer';
import Clock from './../components/Clock';
import HNStories from './../components/HNStories';
import styles from './Home.css';
import {
	Grid,
	Col,
	Row
} from 'react-bootstrap';
import settingIcon from './setting-icon.png';

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
					</Col>
					<Col sm={7} md={7} lg={7}>
						<FeedsContainer />
					</Col>
				</Row>
				<Row>
					{/* <button onClick={ this.goTo }> Login </button> */}
					<Link to="/login">
						<div className={styles.setting}>
							<img src={settingIcon} />
							<p className={styles.inline}> echo "Mirror, show my settings" </p>
						</div>
					</Link>

				</Row>
			</Grid>
		);
	}
}
