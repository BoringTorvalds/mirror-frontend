import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import styles from './Webcam.css';

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

	getScreenShot() {
	  const video = findDOMNode(this);
	  let canvas = document.createElement('canvas');

	  canvas.width = video.clientWidth;
	  canvas.height = video.clientHeight;

	  let ctx = canvas.getContext('2d');
	  ctx.drawImage(video, 0,0, canvas.width , canvas.height);
	  // console.log(video);

	  const dataUrl = canvas.toDataURL('image/jpeg',0.6);
	  return dataUrl;
	}


    //@TODO : Load steps with React view callbacks and show alert on Alert View
    loadCameraStream() {
        let env = this;
        navigator.webkitGetUserMedia({ video: true },(stream) => env.setCameraStream(stream), () => alert('Couldnt connect'));
    }


    render() {

	  return(
		  <video width="400" height="300"  src={ this.getCameraStream() } autoPlay> </video>
		  );
}
}

export default Webcam;
