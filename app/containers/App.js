import React, { Component, PropTypes } from 'react';
import FaceContainer from './FaceContainer';
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<div> 
				<FaceContainer  hidden/>
				{this.props.children}
			</div>
		);
	}

}

App.propTypes = {
	children: HTMLElement
}

export default connect()(App);
