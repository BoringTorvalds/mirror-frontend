import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import { push } from 'react-router-redux';
import FaceContainer from './LoginContainer';
import {
	Grid,
	Col,
	Row
} from 'react-bootstrap';

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
			return <h2> Hi {person.name}, <br/> Please position your face in the circle. <br/> Say "I'm Ready" to Alexa when you're ready </h2>
		}
		return <h2> Please tell Alexa your name. </h2>
	}
	_renderSignUpForm = () =>{
			return <Grid>
				{ this._renderStatus()}
				{ this.props.signup.isFetched && <FaceContainer training={this.props.signup.training} ref="face" /> }
			</Grid>
	}
	render() {
		const connectionError = <h2> There's an issue connecting to OpenFace. <br /> Please refresh the app </h2>;
		const containerStyle = {
			padding: "15% 10%"
		}
		return(
			<div style={containerStyle}>
				{/* { !this.props.isConnected ? this._renderSignUpForm() : connectionError } */}
				{this._renderSignUpForm()}
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
