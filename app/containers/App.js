import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import FaceContainer from './FaceContainer';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const Container = styled.div`
		background-color: #000;
		font-family: "HelveticaNeue-UltraLight";
		color: #fff;
		min-height: 1000px;
		`;
		return ( 
			<Container> 
				<FaceContainer />
				{this.props.children}
			</Container>
		);
	}

}

App.propTypes = {
	children: HTMLElement
}

export default connect()(App);
