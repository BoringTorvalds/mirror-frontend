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

    componentWillMount(){
        // Avoiding timeout still runs when component is unmounted
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
    }

    updateClock() {
        const currentTime = this.getTime();
        this.setState(currentTime);
        this.setTimer();
    }

    getTime() {
        const currentTime = new Date();
        return {
            hours: currentTime.getHours(),
            minutes: currentTime.getMinutes(),
            seconds: currentTime.getSeconds(),
            ampm: currentTime.getHours() >= 12 ? 'pm' : 'am'
        };
    }

    setTimer() {
        this.timeOut = setTimeout(this.updateClock.bind(this), 1000);
    }

    render(){
        const {
            hours,
            minutes,
            seconds,
            ampm
        } = this.state;

        return(
            <div className={styles.container}>
            {
                hours == 0 ? 12 :
                (hours >12) ? hours - 12 : hours
            }: {
                minutes > 9 ? minutes: `0${minutes}`
            }: {
                seconds > 9 ? seconds: `0${seconds}`
            } {ampm}

            </div>
        );
    }
}

export default Clock;
