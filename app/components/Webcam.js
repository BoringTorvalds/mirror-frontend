import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { IS_VIDEO_STREAM } from './../constants/config';

/**
 * Webcam component
 */
class Webcam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			streamUrl: null
		};
		this.mediaStream = null;
	}

	componentDidMount() {
		if (IS_VIDEO_STREAM) {
			this.loadCameraStream();
		}
	}


	/**
	 * Set state.streamUrl to stream url after obtaining it from Webcam
	 * @params {String} webcam stream url
	 */
	setCameraStream(source) {
		const url = URL.createObjectURL(source);
		this.mediaStream = source.getTracks()[0];
		this.setState({ streamUrl : url });
	}

	/**
	 * Get camera stream 
	 * In production mode, return url from raspberry pi
	 * In dev mode, return url from current machine's webcam exposed in Chromium
	 *
	 * @return {String} webcam stream url
	 */
	getCameraStream () {
		// return this.state.streamUrl;
		// "http://172.24.1.1:8080/stream/video.mjpeg"
		if (IS_VIDEO_STREAM) {
			return this.state.streamUrl;
		}
		return "http://raspberrypi:8080/stream/video.mjpeg";
		// return "http://b7036544.ngrok.io/stream/video.mjpeg";
	}

	/**
	 * Capture current screenshot of video
	 * Height and Width of screenshot is set default to equal video's dimensions
	 *
	 */
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


	/** 
	 * Load webcam
	 */
	loadCameraStream() {
		navigator.webkitGetUserMedia({ video: true },(stream) => env.setCameraStream(stream), () => alert('Couldnt connect'));
	}


	/**
	 * Render Webcam component 
	 */
	render() {
		const hiddenStyle =  this.props.hidden ? {
			"position" : "absolute",
			"top": "-99999px",
			"bottom": "-99999px"
		} : null;
		if (IS_VIDEO_STREAM) {
			return(<video
				src={ this.getCameraStream() } 
				width="400" 
				height="300"  
				style={hiddenStyle}
				autoPlay
			> 
			</video>
			);
		} else {
			return(
				<img style={hiddenStyle} src={this.getCameraStream()} width="400" height="300" alt="image" />
			);
		}
	}
}

Webcam.propTypes = {};

export default Webcam;
