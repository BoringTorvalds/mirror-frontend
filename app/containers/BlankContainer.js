import React, {Component} from 'react';
import {connect} from 'react-redux';
/**
 * React.Component class represents blank page (TurnOff mode)
 */

class BlankContainer extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <div></div>
	}
}

export default connect()(BlankContainer);
