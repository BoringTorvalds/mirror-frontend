`FaceContainer` (component)
===========================

React Component represents Face Container
This stores state to send back frame to OpenFace server 
Or receive a new annotated frame and display it

Props
-----

### `add`

True value indicates current profile should be added to server

type: `bool`


### `counts`

represents the training process percentage, used to dispatch to store when the training should be started

type: `number`


### `currentIdentity`

holds value of current user

type: `string`


### `debug`

True then show the webcam on main screen, false then set debug mode off

type: `bool`


### `face`

response from OpenFace server, 2d coordinates

type: `arrayOf[object Object]`


### `hideFace`

False value indicates mirror should show annotated frame, True is hide it

type: `bool`


### `openface`

Current state of OpenFace protocol

type: `object`


### `person`

name of the person given by Alexa

type: `string`


### `training`

indicate training state is on or off

type: `bool`


Methods
-------

### `_sendState`
Send current state of training to OpenFace Server


### `_sendFrameLoop`
Start frame loop by sending a state to OpenFace server 
And receive a frame back


### `_screenShot`
Request Webcam component to take a screenshot 
By using this.refs.webcam


### `_closeSocket`
Close current websocket connection to OpenFace server


### `_onSocketOpen`
On connection open to Openface Server
Reset settings


### `_getDataURLFromRGB`
Encode current frame from _screenShot to DataStringUrl
type: `undefined`


### `createSocket`
Create websocket to connect to OpenFace


### `setTrainingOff`
Set training mode to be off and send to OpenFace server


### `closeConnection`
Close current connection to OpenFace


