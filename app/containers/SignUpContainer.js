import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {Grid, Col, Row} from 'react-bootstrap';
import CircularProgress from './../components/CircularProgress';
import { 
	showFace, 
	updateTraining, 
	addPersonRequest,
	trainingFinished
} from './../actions/facialAuth';
import { updateProcessedCounts } from './../actions/signup';

/**
 * React Component represents Sign Up Page
 * Location : 'app/containers/SignUpContainer'
 * This page is used to start the sign up process using facial recognition feature
 *
 */
class SignUpContainer extends Component {

	constructor(props) {
		super(props);
	}

	/**
	 * Watching for changes in state.facialAuth.training
	 * If training is switch to True, start counting process till 10 counts and switch back to False.
	 * By dispatching to Redux store with trainingFinished, updateTraining, updateProcessCounts
	 */
	componentWillUpdate(nextProps) {
		if (nextProps.training) {
			if (nextProps.counts === 10) {
				setTimeout(()=> {
					this.props.dispatch(trainingFinished());
					this.props.dispatch(updateProcessedCounts(0)) ;
					this.props.dispatch(updateTraining(false));

				}, 2000);
			} else {
				setTimeout(()=> {
					this.props.dispatch(updateProcessedCounts(this.props.counts + 1));
				},800);
			}
		}
	}

	/**
	 * Render <CircularProgress> Component
	 * Represent percentage of facial authentication sign up process 
	 */
	renderCounts = () => {
		const percentage = this.props.counts * 10;
		return <CircularProgress percentage={percentage} radius="80" strokeWidth="8"	/>
	}

	/**
	 * Render the state of process 
	 * First : Tell Alexa Name
	 * Second: Place face at center of mirror
	 * Last: Finished 
	 */
	renderStatus = () => {
		const {
			person,
			isTrainingRequest,
			isTrainingFinished,
			training
		} = this.props;

		if (person !== null) {
			// Start with showing annotated frame drawn on canvas
			this.props.dispatch(showFace());

			// If training mode is turning on, start progress and counting
			// Trigger request to training
			if (training){
				return this.renderCounts();
			// If training is started 
			} else if (!isTrainingFinished) {
				return <h2> Hi {person}, <br/> Say "Set training on" to Alexa when you're ready </h2>
			// Once training is finished
			} else if (isTrainingFinished) {
				return <h2> Your profile has been saved ! </h2>
			}
		}
		// First state 
		return <h2> Please tell Alexa your name. </h2>
	}
	render() {
		const connectionError = <h2> There's an issue connecting to OpenFace. <br /> Please refresh the app </h2>;
		const StatusContainer = styled.div`
			text-align: center;
			width: 100%;
		`;
		const Text = styled.div`
			position: absolute;
			top: 600px;
			width: 100%;
			text-align: center;
		`;
		return(
			<StatusContainer>
				<Text>
					{this.renderStatus()}
				</Text>
			</StatusContainer>
		);
	}
}

SignUpContainer.propTypes = {
	/** a value indicate whether the training mode is on. */
	training: PropTypes.bool,
	/** a value indicate the percentage of training process */
	counts: PropTypes.number,
	/** show the current person in front of mirror */
	person: PropTypes.string,
	/** indicate status of training mode to be finished or not */
	isTrainingFinished: PropTypes.bool,
	/** indicate status of training mode to be requested or not */
	isTrainingRequest: PropTypes.bool
};

const parseFacialAuth = ({training, person, isTrainingRequest, isTrainingFinished}) => {
	return {
		training: training,
		person: person,
		isTrainingRequest: isTrainingRequest,
		isTrainingFinished: isTrainingFinished
	};
}
const mapStateToProps = ({signup, facialAuth}) => {
	const auth = parseFacialAuth(facialAuth);
	return {
		...signup, 
		...auth
	}
};

export default connect(mapStateToProps)(SignUpContainer);
