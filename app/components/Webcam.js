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


	/**
	 * Save stream URL after obtaining it from WEbcam
	 */
	setCameraStream(source) {
		const url = URL.createObjectURL(source);
		this.mediaStream = source.getTracks()[0];
		this.setState({ streamUrl : url });
	}

	getCameraStream() {
		return this.state.streamUrl;
		// return "http://172.24.1.1:8080/stream/video.mjpeg"
	}

	getScreenShot() {
		const video = findDOMNode(this);
		let canvas = document.createElement('canvas');

		canvas.width = video.clientWidth;
		canvas.height = video.clientHeight;

		let ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0,0, canvas.width , canvas.height);
		const ratio = 0.6;
		const dataUrl = canvas.toDataURL('image/jpeg',ratio);
		return dataUrl;
	}


	//@TODO : Load steps with React view callbacks and show alert on Alert View
	loadCameraStream() {
		let env = this;
		navigator.webkitGetUserMedia({ video: true },(stream) => env.setCameraStream(stream), () => alert('Couldnt connect'));
	}


	render() {

		return(
			<video
				src={ this.getCameraStream() } 
				width="400" 
				height="300"  
				autoPlay
			> 
			</video>
		);
	}
}

export default Webcam;
