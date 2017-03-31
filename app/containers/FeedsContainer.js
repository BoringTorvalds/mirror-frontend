import React, { Component, PropTypes } from 'react'; // import { connect } from 'react-redux';
export default class FeedsContainer extends Component {
  static propTypes = {
	news: PropTypes.object
  }
  constructor(props) {
	super(props);
  }

  renderEmptyView() {
	return (
	  <div> No News </div>
	)
  }

  renderNews() {
	return(
	  <div>
		List of news
	  </div>
	)
  }

  render() {
	return(
	  <div>
		{ this.props.news ? 
		  this.renderNews() : 
		  this.renderEmptyView()
		}
	  </div>
	)
  }
}


