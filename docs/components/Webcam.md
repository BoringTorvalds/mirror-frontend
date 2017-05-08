`Webcam` (component)
====================

Webcam component


Methods
-------

### `setCameraStream`
Set state.streamUrl to stream url after obtaining it from Webcam


### `getCameraStream`
Get camera stream 
In production mode, return url from raspberry pi
In dev mode, return url from current machine's webcam exposed in Chromium
type: `undefined`


### `getScreenShot`
Capture current screenshot of video
Height and Width of screenshot is set default to equal video's dimensions


### `loadCameraStream`
Load webcam


