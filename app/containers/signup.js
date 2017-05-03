import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { 
	showFace, 
	updateTraining, 
	addPersonRequest,
	trainingFinished
} from './../actions/facialAuth';
import { updateProcessedCounts } from './../actions/signup';
import {Grid, Col, Row} from 'react-bootstrap';
import CircularProgress from './../components/CircularProgress';

class SignUp extends Component {

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
					this.props.dispatch(updateProcessedCounts(this.props.counts + 0.5));
				},1000);
			}
		}
	}
	_renderCounts = () => {
		const percentage = (this.props.counts / 10) * 100;
		return <CircularProgress percentage={percentage} radius="80" strokeWidth="8"	/>
	}
	_renderStatus = () => {
		const {
			person,
			trainingRequest,
			trainingFinished,
			training
		} = this.props;
		if (person !== null) {
			this.props.dispatch(showFace());
			if (training){
				return this._renderCounts();
			} else if (!trainingFinished) {
				return <h2> Hi {person}, <br/> Say "I'm Ready" to Alexa when you're ready </h2>
			} else if (trainingFinished) {
				return <h2> Your profile has been saved ! </h2>
			}
		}
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

SignUp.propTypes = {
	training: PropTypes.boolean,
	counts: PropTypes.number,
	person: PropTypes.string,
	trainingFinished: PropTypes.boolean,
	trainingRequest: PropTypes.boolean
};

const parseFacialAuth = ({training, person, trainingRequest, trainingFinished}) => {
	return {
		training: training,
		person: person,
		trainingRequest: trainingRequest,
		trainingFinished: trainingFinished
	};
}
const mapStateToProps = ({signup, facialAuth}) => {
	const auth = parseFacialAuth(facialAuth);
	return {
		...signup, 
		...auth
	}
};

export default connect(mapStateToProps)(SignUp);
