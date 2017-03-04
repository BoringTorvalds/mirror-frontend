import React, { Component } from 'react';

class Webcam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            streamUrl: null
        };
        this.getCameraStream = this.getCameraStream.bind(this);
        this.mediaStream = null;
    }

    componentDidMount() {
        this.loadCameraStream();
    }

    componentWillUnmount() {
        this.mediaStream.stop();
    }


    setCameraStream(source) {
        const url = URL.createObjectURL(source);
        this.mediaStream = source.getTracks()[0];
        this.setState({ streamUrl : url });
    }

    getCameraStream() {
        return this.state.streamUrl;
    }


    //@TODO : Load steps with React view callbacks and show alert on Alert View
    loadCameraStream() {
        let env = this;
        navigator.webkitGetUserMedia({ video: true },(stream) => env.setCameraStream(stream), () => alert('Couldnt connect'));
    }


    render() {

        return(
            <div>
                Webcam
                { this.getCameraStream() && <video width="320" height="240"  src={ this.getCameraStream() } autoPlay> </video> }
            </div>
        );
    }
}

export default Webcam;
