import React, {Component} from 'react';
import {Link} from 'react-router';
import styled from 'styled-components';
import settingIcon from './setting-icon.png';

export default class Setting extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		const Setting = styled.div`
			color: #fff;
			position: relative;
		`;
		const Text = styled.p`
			display: inline;
		`;
			
		return(
			<Link to="/setting">
				<Setting>
					<img src={settingIcon} />
					<Text> echo "Mirror, show my settings" </Text>
				</Setting>
			</Link>
		)
	}
}

