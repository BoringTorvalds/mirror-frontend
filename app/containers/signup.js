import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import { push } from 'react-router-redux';
import FaceContainer from './LoginContainer';

class SignUp extends Component {
	static props = {
		isConnected: PropTypes.boolean,
		signup: PropTypes.Object
	}

	constructor(props) {
		super(props);
	}
	_renderStatus = () => {
		const {person, isFetched} = this.props.signup;
		if (isFetched) {
			return <div> Hi {person.name}, <br/> Please position your face in the circle. <br/> Say "Ready" to Alexa when you're ready </div>
		}
		return <div> Please ask Alexa to prompt for your name ... </div>
	}
	render() {
		return(
			<div>
				{ this._renderStatus()}
				Sign Up Page
				{/* <FaceContainer ref="face" /> */}
				{ this.props.isConnected == true ? 'a' : 'b'}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isConnected: state.websocket.isConnected,
		signup: state.signup
	}
}

export default connect(mapStateToProps)(SignUp);
