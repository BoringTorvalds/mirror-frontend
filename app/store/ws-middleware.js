import * as actions from './../actions/SocketActions';
import * as types from './../constants/ActionTypes';
import { push } from 'react-router-redux';

const wsMiddleware = (function(){
  let socket = null;

  const onSocketOpen = (ws, store, token) => evt => {
	store.dispatch(actions.connected());
  }

  const onSocketClose = (ws, store) => evt => {
	store.dispatch(actions.disconnected());
  }

  const onSocketMessage = (ws, store) => evt => {
	store.dispatch(push('/login'));
	store.dispatch(actions.receiveMessage(evt.data));
  }

  return store => next => action => {
	switch(action.type){
	  case types.CONNECT:
		if (socket != null){
		  socket.close();
		}
		store.dispatch(actions.connecting());
		socket = new WebSocket("ws://127.0.0.1:9000");
		socket.onmessage = onSocketMessage(socket, store);
		socket.onopen = onSocketOpen(socket, store, action.token);
		socket.onclose = onSocketClose(socket, store);
		console.log("Socket connected");
		break;

	  case types.DISCONNECT:
		if (socket != null){
		  socket.close();
		}
		socket = null;
		store.dispatch(actions.disconnected());
		break;

	  case types.SEND_MESSAGE:
		socket.send(JSON.stringify(action));
		break;

	  default:
		return next(action);
	}

  }
})();

export default wsMiddleware;
