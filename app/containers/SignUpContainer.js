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


//@TODO : Merge signup reducer with facialAuth somehow
class SignUpContainer extends Component {

	constructor(props) {
		super(props);
	}

	componentWillUpdate = (nextProps) => {
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
	_renderCounts = () => {
		const percentage = this.props.counts * 10;
		return <CircularProgress percentage={percentage} radius="80" strokeWidth="8"	/>
	}
	_renderStatus = () => {
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
				return this._renderCounts();
			// If training is started 
			} else if (!isTrainingFinished) {
				return <h2> Hi {person}, <br/> Say "I'm Ready" to Alexa when you're ready </h2>
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
					{this._renderStatus()}
				</Text>
			</StatusContainer>
		);
	}
}

SignUpContainer.propTypes = {
	training: PropTypes.boolean,
	counts: PropTypes.number,
	person: PropTypes.string,
	isTrainingFinished: PropTypes.boolean,
	isTrainingRequest: PropTypes.boolean
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
