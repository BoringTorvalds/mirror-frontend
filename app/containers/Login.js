import React, { Component } from 'react';
import Webcam from './../components/Webcam';
import { browserHistory } from 'react-router';
export default class Login extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    goTo() {
        browserHistory.push('/home');
    }



    render() {
        return (<div>
    <Webcam />
    <button onClick={this.goTo}> Home </button>
        </div>);
    }

}

