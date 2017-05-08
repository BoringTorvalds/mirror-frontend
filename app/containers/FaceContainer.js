import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as messageTypes from './../constants/SocketMessageTypes';
import Webcam from './../components/Webcam';
import { updateTraining } from './../actions/signup';
import { 
	detectNewFace, 
	updateIdentity, 
	addPersonFinished,
	updateModels,
	addPersonFailure
} from './../actions/facialAuth';
import { OPENFACE_SOCKET_ADDRESS } from './../constants/config';
import { Image } from 'react-bootstrap';
import AnnotatedFrame from './../components/AnnotatedFrame';

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
		return window.setTimeout(callback, 1000/100);
	};
})();

const DEFAULT_TOK= 1;
const DEFAULT_NUMNULLS= 10;


/**
 * React Component represents Face Container
 * This stores state to send back frame to OpenFace server 
 * Or receive a new annotated frame and display it
 */
class FaceContainer extends Component {

	/**
	 * Init variables for OpenFace
	 * @params { number } tok : A variable 0 or 1 to make sure an image was processed 
	 * then client will send more frames 
	 * @params { string } people : Names of People in trained models
	 * @params { string } images : Array of screenshots used for training in form ds:// jpg
	 * @params { number } numNulls : A variable default = 20 to slow down the sending frames sent to server 
	 * @params { bool } training : Indicate if the OpenFace should train a profile or not
	 */
	constructor(props){ 
		super(props);

		this.socket = null;
		this.tok = DEFAULT_TOK;
		this.defaultPerson = -1;
		this.people = [];
		this.images = [];
		this.numNulls = 0;

		this.createSocket(OPENFACE_SOCKET_ADDRESS);
	}

	/**
	 * When component is mounted, assign the images and people variables to store's values
	 */
	componentDidMount() {
		let msg = this.props.openface;
		this.images = msg.images;
		this.people = msg.people;
	}

	/**
	 * @return {object} window
	 *	@return {string} window.w : width
	 *	@return {string} window.h : height
	 */
	getWindow = () => {
		return {
			w : window.outerWidth,
			h : window.outerHeight
		}
	}


	/**
	 * Update current state in store
	 */
	updateState = () => {
		const msg = {
			images: this.images,
			people: this.people,
		};
		console.log("SAVE::::");
		this.props.dispatch(updateModels(msg));
	}

	/** 
	 * Send current state of training to OpenFace Server 
	 */
	_sendState(){
		const msg = {
			type: 'ALL_STATE',
			images: this.images,
			people: this.people,
			training: this.props.training
		};
		console.log(msg);

		this.socket.send(JSON.stringify(msg));
	}

	/**
	 * Example of adding a person 
	 * @params {string} name : person name
	 */
	_addPerson = (name) => {
		if (this.people.indexOf(name) != -1) {
			this.props.dispatch(addPersonFailure("Profile existed"));
			return;
		}

		if (this.socket != null){
			let msg = {
				'type': 'ADD_PERSON',
				'val': name
			};

			this.defaultPerson  = this.people.length;
			this.people.push(name);
			this.socket.send(JSON.stringify(msg));
		}
	}

	/**
	 * Start frame loop by sending a state to OpenFace server 
	 * And receive a frame back 
	 */
	_sendFrameLoop() {
		if (this.socket == null || 
			this.socket.readyState != this.socket.OPEN ||
			this.numNulls != DEFAULT_NUMNULLS
		){
			return;
		}

		if (this.tok > 0){

			if (this.props.add) {
				this._addPerson(this.props.person);
				this.props.dispatch(addPersonFinished());
			}

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
		window.setTimeout(function(){ window.requestAnimFrame(sendFrameLoop) }, 60);
	}

	/**
	 * Request Webcam component to take a screenshot 
	 * By using this.refs.webcam
	 */
	_screenShot(){
		return this.refs.webcam.getScreenShot();
	}

	/**
	 * Close current websocket connection to OpenFace server 
	 */
	_closeSocket(){
		if (this.socket){
			this.socket.close();
		}
		this.socket = null;
	}

	/**
	 * On connection open to Openface Server
	 * Reset settings
	 */
	_onSocketOpen(){
		this.numNulls = 0;
		this.tok = DEFAULT_TOK;
		this.socket.send(JSON.stringify({'type': 'NULL'}));
	}

	/**
	 * Encode current frame from _screenShot to DataStringUrl
	 * @params {object} rgb : current frame
	 * 
	 * @return {string} dataUrl of image/png
	 */
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
		// console.log("----------------------------------");
		// console.log(msg.type);

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
				this.props.dispatch(detectNewFace(msg["landmarks"]));
				// console.log(msg["landmarks"]);
				this.refs.face.updateCanvas();
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
	 * @params {string} ws address
	 */
	createSocket(address) {
		this._closeSocket();

		this.socket = new WebSocket(address);
		this.socket.binaryType = "arraybuffer";
		this.socket.onopen = this._onSocketOpen.bind(this);
		this.socket.onmessage = this._onSocketMessage.bind(this);

		this.socket.onclose = function(){
			console.log("CLOSING SOCKET");
		};
	}

	setTrainingOn = () => {
		const { training, counts } = this.props;
		const msg = {
			type: 'TRAINING',
			val: training
		};
		this.socket.send(JSON.stringify(msg))
	}

	/**
	 * Set training mode to be off and send to OpenFace server 
	 */
	setTrainingOff(){
		const msg = {
			'type': 'TRAINING',
			'val': false
		};
		this.training = false;
		this.socket.send(JSON.stringify(msg))
	}


	/**
	 * Close current connection to OpenFace 
	 */
	closeConnection(){
		this.socket.close();
	}




	render() {
		const {
			training,
			currentIdentity, 
			hideFace,
			counts,
			person,
			debug
		} = this.props;

		const annotatedStyle = {
			position: "relative",
			top: "15%",
			left: "15%"
		};
		return (
			<div>
				<Webcam 
					ref='webcam'
					hidden={!debug}
				/> 
				{ !hideFace && 
					!training &&
					<AnnotatedFrame 
						ref="face"
						points={this.props.face} 
						title={currentIdentity}
						{...this.getWindow()}
					/>
				}
			</div>
		);
	}

}

FaceContainer.propTypes = {
	/** represents the training process percentage, used to dispatch to store when the training should be started */
	counts: PropTypes.number,
	/** response from OpenFace server, 2d coordinates*/
	face: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
	/** indicate training state is on or off */
	training: PropTypes.bool,
	/** holds value of current user */
	currentIdentity: PropTypes.string,
	/** True value indicates current profile should be added to server */
	add: PropTypes.bool,
	/** name of the person given by Alexa */
	person: PropTypes.string,
	/** False value indicates mirror should show annotated frame, True is hide it */
	hideFace: PropTypes.bool,
	/** Current state of OpenFace protocol */
	openface: PropTypes.object,
	/** True then show the webcam on main screen, false then set debug mode off */
	debug: PropTypes.bool
};

/**
 * Map current props to state
 * @return {object} state.facialAuth
 */
const mapStateToProps = ({facialAuth}) => {
	return facialAuth;
}
export default connect(mapStateToProps)(FaceContainer);
