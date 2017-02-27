import React, { Component } from 'react';

class HNStoryListItem extends Component {
	constructor(){
		super();
	}

	render(){
		const { story } = this.props;
		return (
			<div> 
			<i className="fa fa-newspaper-o" aria-hidden="true"></i> &nbsp;
			{ story.title }  
			</div>
		);
	}
}


export default HNStoryListItem; 
