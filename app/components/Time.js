import React, { Component } from 'react';
import styles from './Time.css';

class Time extends Component {

	constructor(){
		super();
	}

	getTimeNumber(t){
		console.log(t);
		if (t){
			return <div> { t.hour } : { t.minutes } </div>;
		} else {
			return <div> Fetching time ... </div>;
		}
	}

	getTimeString(){
		return <div> Mon, December 5th, 2016 </div>
	}



	render(){
		const { currentTime } = this.props;

		return(
			<div className={styles.container}>
				{ this.getTimeNumber(currentTime) }
				{ this.getTimeString() }
			</div>
		)
	}

}

export default Time;
