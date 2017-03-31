import React, { Component } from 'react';
import HNStoryListItem from './HNStoryListItem';
import styles from './Stories.css';


class HNStories extends Component {
	constructor(){
		super();
		this.getStories = this.getStories.bind(this);
		this.renderStories = this.renderStories.bind(this);
	}


	getStories(){
		//@TODO Feed the actualy Hackernews
		const seed = [
			{ title: "My Favorite Books of 2016 (gatesnotes.com)"},
			{ title: "UBlock Origin for Safari (github.com)"},
			{ title: "The Distribution of Users’ Computer Skills: Worse Than You Think (nngroup.com)"},
			{ title: "Write your own shell in C (brennan.io)" },
			{ title: "1.4B records from “Have I been pwned” for analysis (troyhunt.com)"},
			{ title: "How to not fuck up your manufacturing startup (johnnybowman.org)"}
		];
		return seed;
	}

	/*
	 * @params { Array } stories: List of JSON object story { title: ... }
	 */
	renderStories(stories){
		let rendered = [];

		for (let i=0; i< stories.length; i++){
			rendered.push(<HNStoryListItem key={i} story={stories[i]} />);
		}
		return rendered;
	}

	render(){
		return(
			<div className={styles.container}>
				Hacker News
				{ this.renderStories(this.getStories()) }
			</div>
		);
	}
}

export default HNStories;
