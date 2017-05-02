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
import CircularProgress from './../components/CircularProgress';

class SignUp extends Component {

	constructor(props) {
		super(props);
	}

	componentWillUpdate = (nextProps) => {
		if (nextProps.training) {
			if (nextProps.counts === 10) {
				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(0)) ;
					this.props.dispatch(updateTraining(false));

				}, 2000);
			} else {

				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(this.props.counts + 0.5));
				},500);
			}
		}
	}
	_renderCounts = () => {
		const percentage = (this.props.counts / 10) * 100;
		return <CircularProgress percentage={percentage} radius="80" strokeWidth="10"	/>
	}
	_renderStatus = () => {
		const {person} = this.props;
		if (person !== null) {
			return <h2> Hi {person}, <br/> Please position your face in the circle. <br/> Say "I'm Ready" to Alexa when you're ready </h2>
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
			padding: "10% 5%",
			textAlign: "center"
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
	person: PropTypes.string
};

const mapStateToProps = ({signup, facialAuth}) => {
	return {
		...signup, 
	training: facialAuth.training,
	person: facialAuth.person
	}
};

export default connect(mapStateToProps)(SignUp);
