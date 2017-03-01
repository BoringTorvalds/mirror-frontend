import React, { Component, PropTypes } from 'react';
import styles from './Weather.css';

const propTypes = {
    iconType: PropTypes.string,
    temparature: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired
};
class Weather extends Component {
    constructor(){
        super();
        // this.getWeatherIcon = this.getWeatherIcon.bind(this);
    }

    sunny() {
        return (
            <div className={styles.sunny}>
                <div className={styles.sun}>
                    <div className={styles.rays}> </div>
                </div>
            </div>
        )
    }

    cloudy() {
        return (
            <div className={styles.icon}>
                <div className={styles.cloud}> </div>;
                <div className={styles.cloud}> </div>;
            </div>
        )
    }
    cloud() {
        return(
            <div className={styles.icon}>
                <div className={styles.cloud}> </div>
            </div>
        )
    }

    rain() {
        return(
            <div className={styles.icon}>
                <div className={styles.cloud}> </div>
                <div className={styles.rain}> </div>
            </div>
        )
    }

    thunderStorm() {
        return(
            <div className={styles.icon}>
                <div className={styles.cloud}></div>
                    <div className={styles.lightning}>
                        <div className={styles.bolt}></div>
                        <div className={styles.bolt}></div>
                    </div>
            </div>
        )
    }

    getIcon(icon) {
        switch (icon) {
            case 'clear-night':
                return this.cloud();
            case 'rain':
                return this.rain();
            case 'sleet':
            case 'snow':
            case 'thunderstorm':
                return this.thunderStorm();
            case 'wind':
            case 'fog':
            case 'cloudy':
            case 'partly-cloudy-day':
            case 'partly-cloudy-night':
            case 'clear-day':
                return this.cloudy();
            default:
                return this.sunny();
        }
    }




    render(){
        const { iconType,
                summary,
                temparature
        } = this.props;
        return(
            <div className={styles.container}>
                <div className={styles.topSection}>
                <div className={styles.temperature}>{ temparature }° </div>
                { this.getIcon(iconType) }
                </div>
                <div className={styles.bottomSection}>
                { summary }
                </div>
            </div>
        );
    }
}

Weather.propTypes = propTypes;

export default Weather;
