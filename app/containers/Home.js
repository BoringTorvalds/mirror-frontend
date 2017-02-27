import React, { Component } from 'react';
import Weather from './../components/Weather';
import Time from './../components/Time';
import HNStories from './../components/HNStories';
import styles from './Home.css';

import axios from 'axios';

export default class Home extends Component {
    constructor(){
        super();
        //@TODO: Pass to child component's props later instead of state
        // Utilize Redux for more structured flow
        this.state = { weather: null } 
        this.fetchWeather();
        this.getCurrentTime = this.getCurrentTime.bind(this);
    }

    fetchWeather() {
        const self = this;
        //@TODO: Save token in process variables
        const lat = "32.7357";
        const lng = "97.1081";

        const sampleUrl = "https://api.darksky.net/forecast/9e1bfc49cdc03b377f4d00753ff13ada/" + lat +"," + lng;
        axios({
            url: sampleUrl,
            method: 'get',
            responseType: 'json'
        })
            .then((r) => {
                const d = r.data;
                const days = d.daily.data;
                self.setState({
                    weather: {
                        'current': d.currently.temperature,
                        'summary': d.hourly.summary,
                        'daily': [days[1], days[2], days[3], days[4], days[5]]
                    }
                });
            })
            .catch((r)=> console.log(r));
    }

    getCurrentTime(){
        const tmp = new Date();
        const h = tmp.getHours();
        const m = tmp.getMinutes();
        const r = {
            hour: h,
            minutes: m
        };
        return r;
    }

    render() {
        const self = this;
        return (
            <div className={styles.container}>
            {
                this.state.weather &&
                this.state.weather.current &&
                this.state.weather.summary &&
                <Weather
                iconType="sun"
                summary={this.state.weather.summary}
                temparature={this.state.weather.current}
                />
            }

            <Time currentTime={ this.getCurrentTime() }/>
            <HNStories />
            </div>
        );
    }
}
