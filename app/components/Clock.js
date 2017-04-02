import React, { Component } from 'react';
import styles from './Clock.css';

class Clock extends Component {

	constructor(props){
		super(props);
		const currentTime = new Date();
		this.state = this.getTime();
	}

	componentDidMount() {
		this.setTimer();
	}

	componentWillUnmount(){
		// Avoiding timeout still runs when component is unmounted
		if (this.timeOut) {
			clearTimeout(this.timeOut);
		}
	}

	/**
	 *
	 * Update clock state with new time
	 */
	updateClock() {
		const currentTime = this.getTime();
		this.setState(currentTime);
		this.setTimer();
	}

	/**
	 *
	 * Parse current Date object
	 * @return {Object} properties of current time
	 */
	getTime() {
		const currentTime = new Date();
		const date = currentTime.toDateString().split(" ");
		return {
			hours: currentTime.getHours(),
			minutes: currentTime.getMinutes(),
			seconds: currentTime.getSeconds(),
			ampm: currentTime.getHours() >= 12 ? 'pm' : 'am',
			dayOfWeek: date[0],
			month: date[1],
			date: date[2]
		};
	}

	/**
	 *
	 * Update current clock for every 1 second
	 */
	setTimer() {
		this.timeOut = setTimeout(()=> {
			this.updateClock() 
		}, 1000);
	}

	render(){
		const {
			hours,
			minutes,
			seconds,
			ampm,
			dayOfWeek,
			month,
			date
		} = this.state;

		return(
			<div className={styles.container}>
				{ dayOfWeek }, { month } { date } <br/> 
				{
					hours == 0 ? 12 :
						(hours >12) ? hours - 12 : hours
				}: {
					minutes > 9 ? minutes: `0${minutes}`
				}: {
					seconds > 9 ? seconds: `0${seconds}`
				} {ampm} <br/>

			</div>
		);
	}
}

export default Clock;
