import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import { updateProcessedCounts } from './../actions/signup';
import { updateTraining, addPersonRequest } from './../actions/facialAuth';

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
		if (nextProps.training) {
			if (nextProps.counts === 10) {
				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(0)) ;
					this.props.dispatch(addPersonRequest());
					this.props.dispatch(updateTraining(false));

				}, 2000);
			} else {
				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(this.props.counts + 1));
				},1000);
			}
		}
	}
	_renderCounts = () => {
		return <div> {this.props.counts } </div>
	}
	_renderStatus = () => {
		const {person, isFetched} = this.props;
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
				{ this.props.training && this._renderCounts() }
			</div>
		);
	}
}

SignUp.propTypes = {
	training: PropTypes.boolean,
	counts: PropTypes.number,
	isFetched: PropTypes.boolean,
	isFetching: PropTypes.boolean,
	person: PropTypes.object
};

const mapStateToProps = ({signup, facialAuth}) => {
	return {
		...signup, 
	training: facialAuth.training
	}
};

export default connect(mapStateToProps)(SignUp);
