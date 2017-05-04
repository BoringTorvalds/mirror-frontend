import React, {Component} from 'react';
import Clock from './../components/Clock';
import { Link } from 'react-router';
import styled from 'styled-components';
import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

export default class SettingContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const SettingContainer = styled.div`
			padding-top: 50%;
			font-size: xx-large;
		`;

		const textStyle = {color: "white"};
		return(
			<Grid fluid>
				<Col smOffset={4} mdOffset={4} lgOffset={4} sm={4} md={4} lg={4}>
					<SettingContainer>
						<Link style={textStyle} to="/signup"> New Profile </Link> <br/>
						<Link style={textStyle} to="/login"> Profile </Link>
					</SettingContainer>
				</Col>
				<Col sm={4} md={4} lg={4}>
					<Clock />
				</Col>
			</Grid>
		);
	}
}

