import React, {Component} from 'react';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import { push } from 'react-router-redux';
import FaceContainer from './Login';

class SignUp extends Component {
	constructor(props) {
		super(props);
	}

	handleNavigate = ()=> {
		this.props.dispatch(push("/login"));
	}

	render() {
		return(
			<div>
				<button onClick={this.handleNavigate}> Click </button>
				Sign Up Page
				{/* <FaceContainer ref="face" /> */}
				{ this.props.isConnected == true ? 'a' : 'b'}
			</div>
		)
	}


}

const mapStateToProps = (state) => {
	return {
		isConnected: state.websocket.isConnected
	}
}

export default connect(mapStateToProps)(SignUp);
