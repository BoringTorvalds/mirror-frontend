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
		min-height: 1500px;
		`;
		return ( 
			<Container> 
				{/* { this.props.ws.connected ? "Connection OK": "Not connected"}; */}
				<FaceContainer />
				{this.props.children}
			</Container>
		);
	}

}

App.propTypes = {
	children: HTMLElement,
	ws: PropTypes.object
}
const mapStateToProps = ({ws}) =>({ws: ws});
export default connect(mapStateToProps)(App);
