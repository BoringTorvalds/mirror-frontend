import React, { Component } from 'react';
import Weather from './../components/Weather';
import Clock from './../components/Clock';
import HNStories from './../components/HNStories';
import styles from './Home.css';
import { hashHistory, Link } from 'react-router';

import axios from 'axios';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = { weather: null }
        this.fetchWeather();
    }

    goToLogin() {
        hashHistory.push('/login') ;
    }

    fetchWeather() {
        const self = this;
        //@TODO: Save token in process variables
        const lat = "32.7357";
        const lng = "-97.1081";

        const sampleUrl = "https://api.darksky.net/forecast/9e1bfc49cdc03b377f4d00753ff13ada/" + lat +"," + lng;
        axios({
            url: sampleUrl,
            method: 'get',
            responseType: 'json'
        })
            .then((r) => {
                const d = r.data;
                console.log(d);
                const days = d.daily.data;
                self.setState({
                    weather: {
                        current: d.currently.temperature,
                        summary: d.hourly.summary,
                        daily: [...days],
                        iconType: d.currently.icon
                    }
                });

            })
            .catch((r)=> console.log(r));
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
                        iconType={this.state.weather.iconType}
                        summary={this.state.weather.summary}
                        temparature={this.state.weather.current}
                    />
                }

                <Clock />
                <HNStories />
                <button onClick={ this.goToLogin }> Login </button>
            </div>
        );
    }
}
