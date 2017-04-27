// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
	constructor(props) {
		super(props);
	}
	static props =  {
		children: HTMLElement,
		isConnected: PropTypes.boolean
	}

	render() {
		return ( 
			< div > 
				{this.props.children}
		 </div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		isConnected: state.websocket.isConnected
	};
}

export default connect(mapStateToProps)(App);
