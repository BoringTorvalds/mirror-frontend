import React, {Component} from 'react';
import Base from './Base';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';
import FaceContainer from './Login';

class SignUp extends Base {
	constructor(props) {
		super(props);
	}

	handleNavigate = ()=> {
		this.props.dispatch({type: 'CONNECT'});
	}

	render() {
		return(
			<div>
				Sign Up Page
				<FaceContainer ref="face" />
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
