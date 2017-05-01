import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import { 
	updateProcessedCounts, 
	updateTraining 
} from './../actions/signup';

import {
	Grid,
	Col,
	Row
} from 'react-bootstrap';

class SignUp extends Component {

	constructor(props) {
		super(props);
	}

	componentWillUpdate = (nextProps) => {
		console.log(nextProps.signup);
		if (nextProps.signup.training) {
			if (nextProps.signup.counts == 10) {
				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(0)) ;
					this.props.dispatch(updateTraining(false));
				}, 2000);
			} else {
				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(this.props.signup.counts + 1));
				},1000);
			}
		}
	}
	_renderCounts = () => {
		return <div> {this.props.signup.counts } </div>
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
				{ this.props.signup.training && this._renderCounts() }
			</div>
		);
	}
}

SignUp.propTypes = {
	isConnected: PropTypes.boolean,
	signup: PropTypes.Object
};

const mapStateToProps = (state) => {
	return {
		isConnected: state.websocket.isConnected,
		signup: state.signup
	}
};

export default connect(mapStateToProps)(SignUp);
