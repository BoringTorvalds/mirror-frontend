import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import FeedsContainer from './../FeedsContainer';
import WeatherContainer from './../WeatherContainer';
import StockContainer from './../StockContainer';
import Clock from './../../components/Clock';
import Setting from './../../components/Setting';

import {Grid, Col, Row} from 'react-bootstrap';

/**
 * React component represents home page of mirror
 * Contains components:
 * weather
 * feeds
 * clock
 * settings
 */
class Home extends Component {
	constructor(props){
		super(props);
	}

	render() {
		const {person} = this.props;
		const title = ((person == "Unknown") || (person == "Nobody")) ? person : "Hi " + person;
		return (
			<Grid>
				<Row style={{marginBottom: "50"}}> 
					<Col sm={4} md={4} lg={4}>
						<WeatherContainer />
					</Col>
					<Col smPush={4} mdPush={4} lgPush={4} >
						<Clock title={title} />
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
					<Setting />
			</Grid>
		);
	}
}

Home.propTypes = {
	/** Represent current person infront of mirror */
	person: PropTypes.string
}

Home.defaultProps = {
	person: "Unknown"
}

const mapStateToProps = ({facialAuth}) => {
	const { currentIdentity} = facialAuth;
	return {
		person: currentIdentity
	}
}
export default connect(mapStateToProps)(Home);
