import React, {Component} from 'react';
import Base from './Base';
import { connect } from 'react-redux';
import { connected } from './../actions/websocket';

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
		<button onClick={this.handleNavigate}> Click </button>
		<button onClick={this.navigateTo}> Home Page</button>
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
