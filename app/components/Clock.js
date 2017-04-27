import React, { Component } from 'react';
import styles from './Clock.css';

class Clock extends Component {

	constructor(props){
		super(props);
		const currentTime = new Date();
		this.state = this._getTime();
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
		const currentTime = this._getTime();
		this.setState(currentTime);
		this.setTimer();
	}

	/**
	 * Parse current Date object
	 *
	 * @return {Object} currentTime
	 *	@return {int} currentTime.hour
	 *	@return {int} currentTime.minutes
	 *	@return {string} currentTime.ampm "am" or "pm"
	 *	@return {string} currentTime.dayOfWeek 
	 *	@return {string} currentTime.month
	 *	@return {int} currentTime.date
	 */
	_getTime = ()=>{
		const dateObject = new Date();
		const dateString = dateObject.toDateString().split(" ");
		const currentTime = {
			hours: dateObject.getHours(),
			minutes: dateObject.getMinutes(),
			seconds: dateObject.getSeconds(),
			ampm: dateObject.getHours() >= 12 ? 'pm' : 'am',
			dayOfWeek: dateString[0],
			month: dateString[1],
			date: dateString[2]
		};

		return currentTime;
	}

	/**
	 * Update current clock for every 1 second
	 *
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
