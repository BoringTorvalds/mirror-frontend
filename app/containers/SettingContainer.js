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
						HelloWorldIntent say hello
						HelloWorldIntent say hello world
						HelloWorldIntent hello
						HelloWorldIntent say hi
						HelloWorldIntent say hi world
						HelloWorldIntent hi
						HelloWorldIntent how are you
						MyNameIsIntent my name is {firstname}
						CreateProfileIntent create a new profile
						CreateProfileIntent sign me up
						CreateProfileIntent new profile
						NavigateIntent navigate me to {Route}
						NavigateIntent go to {Route}
						TrainingOnOffIntent set training {Status}
						TurnOnOffIntent turn {Status}
						WeatherIntent what's the weather like in {Location}
						WeatherIntent how's the weather like in {Location}
						FullWeatherIntent what's detailed weather in {Location}
						FullWeatherIntent detailed about weather in {Location}
						FullWeatherIntent week report about weather in {Location}
						NewsPaginationIntent get me {Option} news
						NewsPaginationIntent display me {Option} news
						NewsPaginationIntent show me {Option} news
						StockLookupIntent give me {Title} stock
						StockLookupIntent look up {Title} stock
						StockLookupIntent get stock from {Title}					
					</SettingContainer>
				</Col>
				<Col sm={4} md={4} lg={4}>
					<Clock />
				</Col>
			</Grid>
		);
	}
}

