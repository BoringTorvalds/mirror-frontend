import React, { Component } from 'react';
import Webcam from './../components/Webcam';
import { hashHistory } from 'react-router';
import * as messageTypes from './../constants/SocketMessageTypes';

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
	return window.setTimeout(callback, 600/60);
  };
})();

// const SOCKET_ADDRESS = "ws://34.208.16.120:9000";
const SOCKET_ADDRESS ="ws://192.168.99.100:9000";
const DEFAULT_TOK= 1;
const DEFAULT_NUMNULLS= 20;

export default class Login extends Component {

  constructor(props){ 
	super(props);
	this.state = {
	  detectedFaces: null
	};

	/**
	 * Init variables for OpenFace
	 * @param { number } tok : A variable 0 or 1 to make sure an image was processed 
	 * then client will send more frames 
	 * @param { string } people : Names of People in trained models
	 * @param { string } images : Array of screenshots used for training in form ds:// jpg
	 * @param { number } numNulls : A variable default = 20 to slow down the sending frames sent to server 
	 * @param { boolean } training : Indicate if the OpenFace should train a profile or not
	 */
	this.socket = null;
	this.tok = DEFAULT_TOK;
	this.defaultPerson = -1;
	this.people = [];
	this.images = [];
	this.numNulls = 0;
	this.training = false;

	this.createSocket(SOCKET_ADDRESS);
	this.setTrainingOn = this.setTrainingOn.bind(this);
	this.setTrainingOff = this.setTrainingOff.bind(this);
	this._sendFrameLoop = this._sendFrameLoop.bind(this);
	this.closeConnection = this.closeConnection.bind(this);
	this.addPerson = this.addPerson.bind(this);
	this.addHim= this.addHim.bind(this);
  }

  componentDidMount() {
  }

  updateState = () => {
	const msg = {
	  type: 'ALL_STATE',
	  images: this.images,
	  people: this.people,
	  training: this.training
	};

  }

  _sendState(){
	const msg = {
	  type: 'ALL_STATE',
	  images: this.images,
	  people: this.people,
	  training: this.training
	};

	this.socket.send(JSON.stringify(msg));
  }

  addHim(){
	if (this.socket != null){
	  let msg = {
		'type': 'ADD_PERSON',
		'val': 'TOM'
	  };
	  this.defaultPerson = this.people.length;
	  this.people.push('TOM');
	  this.socket.send(JSON.stringify(msg));
	}
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

  _sendFrameLoop() {
	if (this.socket == null || 
	  this.socket.readyState != this.socket.OPEN ||
	  this.numNulls != DEFAULT_NUMNULLS
	){
	  return;
	}

	if (this.tok > 0){

	  const dataURL = this._screenShot();
	  const msg = {
		'type': 'FRAME',
		'dataURL': dataURL,
		'identity': this.defaultPerson
	  };

	  this.socket.send(JSON.stringify(msg));
	  this.tok--;
	}

	let sendFrameLoop = this._sendFrameLoop.bind(this);
	window.setTimeout(function(){ window.requestAnimFrame(sendFrameLoop) }, 150);
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
  _onSocketMessage (e){
	const msg = JSON.parse(e.data);
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
		this.setState({
		  detectedFaces: msg['content']
		});
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
		console.log(this.images);
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
		  }

		} else {
		  console.log("Nobody detected");
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

  setTrainingOn(){
	const msg = {
	  type: 'TRAINING',
	  val: true 
	};
	this.training = true;
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
	return (<div>
	  <Webcam ref='webcam'/> 
	  { this.state.detectedFaces && <img src={this.state.detectedFaces} width="800px" /> }
	  <button onClick={this.goTo}> Home </button>
	  <button onClick={ this.setTrainingOn }> Train on</button>
	  <button onClick={ this.setTrainingOff }> Train off</button>
	  <button onClick={this._sendFrameLoop}> Send </button>
	  <button onClick={ this.closeConnection}> Close </button>
	  <button onClick={ this.addPerson }> Add Me </button>
	  <button onClick={ this.addHim }> Add Tom </button>

	</div>);
  }

}

