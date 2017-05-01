import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as messageTypes from './../../constants/SocketMessageTypes';
import Webcam from './../../components/Webcam';
import { updateTraining } from './../../actions/signup';
import { detectNewFace, updateIdentity } from './../../actions/facialAuth';
import { OPENFACE_SOCKET_ADDRESS } from './../../constants/config';
import { Image } from 'react-bootstrap';
import styles from './Login.css'

/**
 * Request new frames to rerender annotated frames
 */
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element) {
		return window.setTimeout(callback, 300/60);
	};
})();

//const SOCKET_ADDRESS = "ws://34.208.16.120:9000";
const DEFAULT_TOK= 1;
const DEFAULT_NUMNULLS= 20;

class FaceContainer extends Component {

	/**
	 * Init variables for OpenFace
	 * @param { number } tok : A variable 0 or 1 to make sure an image was processed 
	 * then client will send more frames 
	 * @param { string } people : Names of People in trained models
	 * @param { string } images : Array of screenshots used for training in form ds:// jpg
	 * @param { number } numNulls : A variable default = 20 to slow down the sending frames sent to server 
	 * @param { boolean } training : Indicate if the OpenFace should train a profile or not
	 */
	constructor(props){ 
		super(props);

		this.socket = null;
		this.detectedFace = null;
		this.tok = DEFAULT_TOK;
		this.defaultPerson = -1;
		this.people = [];
		this.images = [];
		this.numNulls = 0;

		this.createSocket(OPENFACE_SOCKET_ADDRESS);
	}

	componentDidMount() {
		let msg = localStorage.getItem('faces');
		if (msg) {
			msg = JSON.parse(msg);
			this.images = msg.images;
			this.people = msg.people;
		}
	}


	updateState = () => {
		const msg = {
			type: 'ALL_STATE',
			images: this.images,
			people: this.people,
			training: this.props.training
		};
		localStorage.setItem('faces', JSON.stringify(msg));

	}

	_sendState(){
		const msg = {
			type: 'ALL_STATE',
			images: this.images,
			people: this.people,
			training: this.props.training
		};


		this.socket.send(JSON.stringify(msg));
	}

	addPerson(){
		if (this.socket != null){
			let msg = {
				'type': 'ADD_PERSON',
				'val': 'Nhat'
			};

			this.defaultPerson  = this.people.length;

			this.people.push('Nhat');

			this.socket.send(JSON.stringify(msg));
		}
	}


	getIdentity = () => {
		const len = this.people.length;
		return this.people[len-1];
	}

	_sendFrameLoop() {
		if (this.socket == null || 
			this.socket.readyState != this.socket.OPEN ||
			this.numNulls != DEFAULT_NUMNULLS
		){
			return;
		}

		if (this.tok > 0){

			const dataURL = this._screenShot();
			this.setTrainingOn();
			const msg = {
				'type': 'FRAME',
				'dataURL': dataURL,
				'identity': this.defaultPerson
			};

			this.socket.send(JSON.stringify(msg));
			this.tok--;
		}

		let sendFrameLoop = this._sendFrameLoop.bind(this);
		window.setTimeout(function(){ window.requestAnimFrame(sendFrameLoop) }, 100);
	}

	_screenShot(){
		return this.refs.webcam.getScreenShot();
	}

	_closeSocket(){
		if (this.socket){
			this.socket.close();
		}
		this.socket = null;
	}

	_onSocketOpen(){
		this.numNulls = 0;
		this.tok = DEFAULT_TOK;
		this.socket.send(JSON.stringify({'type': 'NULL'}));
	}

	_getDataURLFromRGB(rgb) {
		var rgbLen = rgb.length;

		let canvas = document.createElement('canvas');
		canvas.width = "96px";
		canvas.height = "96px";

		let ctx = canvas.getContext("2d");
		let imageData = ctx.createImageData(96, 96);
		let data = imageData.data;
		let dLen = data.length;
		let i = 0, t = 0;

		for (; i < dLen; i +=4) {
			data[i] = rgb[t+2];
			data[i+1] = rgb[t+1];
			data[i+2] = rgb[t];
			data[i+3] = 255;
			t += 3;
		}
		ctx.putImageData(imageData, 0, 0);
		return canvas.toDataURL("image/png");
	}

	/**
	 * Process onmessage events corresponding to OpenFace WS protocol
	 */
	_onSocketMessage = (e) => {
		const msg = JSON.parse(e.data);
		console.log("----------------------------------");
		console.log(msg.type);

		switch(msg.type) {
			case messageTypes.NULL:
				// this.receivedTimes.push(new Date());
				this.numNulls++;
				if (this.numNulls == DEFAULT_NUMNULLS){
					this._sendState();
					this._sendFrameLoop();
				} else {
					this.socket.send(JSON.stringify({'type': 'NULL'}));
				}
				break;

			case messageTypes.ANNOTATED:
				const {counts} = this.props;
				this.props.dispatch(detectNewFace());
				this.detectedFace = msg['content'];
				break;

			case messageTypes.NEW_IMAGE:
				const newImage = {
					hash: msg.hash,
					identity: msg.identity,
					image: this._getDataURLFromRGB(msg.content),
					representation: msg.representation
				}
				this.images.push(newImage);
				this.updateState();
				console.log(msg.identity);
				break;

			case messageTypes.PROCESSED:
				this.tok++;
				break;

			case messageTypes.IDENTITIES:
				let len = msg.identities.length;
				if (len){
					for (let i=0; i<len; i++){
						let identity = "Unknown";
						let idIndex = msg.identities[i];
						if (idIndex != -1){
							identity = this.people[idIndex];
						}
						console.log("Identity is " + identity);
						this.props.dispatch(updateIdentity(identity));
					}

				} else {
					console.log("Nobody detected");
					this.props.dispatch(updateIdentity("Nobody"));
				}
				break;
			case messageTypes.TSNE_DATA:
				console.log("T");
				break;

		}
	}



	/**
	 * Create websocket to connect to OpenFace 
	 * @param {String} ws address
	 */
	createSocket(address) {
		// Close openning socket if any
		this._closeSocket();

		this.socket = new WebSocket(address);
		this.socket.binaryType = "arraybuffer";
		this.socket.onopen = this._onSocketOpen.bind(this);
		this.socket.onmessage = this._onSocketMessage.bind(this);

		this.socket.onclose = function(){
			console.log("CLOSING SOCKET");
		};
	}

	goTo() {
		hashHistory.push('/home');
	}

	setTrainingOn = () => {
		const msg = {
			type: 'TRAINING',
			val: this.props.training
		};

		// this.training = true;
		this.socket.send(JSON.stringify(msg))
	}

	setTrainingOff(){
		const msg = {
			'type': 'TRAINING',
			'val': false
		};
		this.training = false;
		this.socket.send(JSON.stringify(msg))
	}


	closeConnection(){
		this.socket.close();
	}




	render() {
		const {
			training,
			hidden 
		} = this.props;
		if (hidden){
			return <div> 
			<h1> { this.props.currentIdentity } </h1>
				<Webcam 
				ref='webcam'
				hidden
			/> 
		</div>
		}

		return (<div>
			<h1> { this.props.currentIdentity } </h1>
			<Webcam 
				ref='webcam'
				hidden
			/> 
			{ this.props.training ? "Training" : "Not Training"}
			{ !this.props.training &&
				<Image 
					src={this.detectedFace} 
					width="800" 
					height="600"
					id={this.props.counts}
				/> 
			}

		</div>);
	}

}

FaceContainer.propTypes = {
	counts: PropTypes.number,
	training: PropTypes.boolean,
	hidden: PropTypes.boolean,
	currentIdentity: PropTypes.string
};

const mapStateToProps = ({facialAuth}) => {
	return facialAuth;
}
export default connect(mapStateToProps)(FaceContainer);
