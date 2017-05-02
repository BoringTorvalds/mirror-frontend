import React, {Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import { updateProcessedCounts } from './../actions/signup';
import { 
	showFace, 
	updateTraining, 
	addPersonRequest,
	trainingFinished
} from './../actions/facialAuth';

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
			person
		}
		= this.props;
		if (person !== null) {
			this.props.dispatch(showFace());
			return <h2> Hi {person}, <br/> Say "I'm Ready" to Alexa when you're ready </h2>
		}
		return <h2> Please tell Alexa your name. </h2>
	}
	render() {
		const connectionError = <h2> There's an issue connecting to OpenFace. <br /> Please refresh the app </h2>;
		const containerStyle = {
			padding: "5% 5%",
			textAlign: "center"
		}
		return(
			<div style={containerStyle}>
				<Grid>
					{this._renderStatus()}
				</Grid>
				{ this.props.training && this._renderCounts() }
			</div>
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
