import React from 'react';
import Cloud from './cloudy.png';
import Rain from './rain.png';
import Thunderstorm from './thunderstorm.png';
import Wind from './windy.png';
import Sun from './sun.png';
import styled from 'styled-components';

export default ({iconType}) => {
	const Img = styled.img`
		height: 50px;
		width: auto;
	`;
	const CloudImg = styled.img`
		height: 25px;
		width: auto;
	`;
	console.log("ICON " + iconType);
	switch (iconType){
		case 'clear-night':
			return <Img src={Cloud} />;
		case 'rain':
			return <Img src={Rain} />;
		case 'sleet':
		case 'snow':
		case 'thunderstorm':
			return <Img src={ThunderStorm} />;
		case 'wind':
		case 'fog':
		case 'cloudy':
		case 'partly-cloudy-day':
		case 'partly-cloudy-night':
			return <CloudImg src={Cloud} />
		case 'clear-day':
			return <Img src={Sun} />;
		default:
			return <Img src={Sun} />;
	}
}
