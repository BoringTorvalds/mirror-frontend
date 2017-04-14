import * as actions from './../actions/SocketActions';
import * as types from './../constants/ActionTypes';
import { parseNavigationRequest } from './../utils/AlexaParser';
import { push } from 'react-router-redux';
import { fetchStock } from './../actions/stock';

const wsMiddleware = (function(){
	let socket = null;

	const onSocketOpen = (ws, store, token) => evt => {
		store.dispatch(actions.connected());
	}

	const onSocketClose = (ws, store) => evt => {
		store.dispatch(actions.disconnected());
	}


	const onSocketMessage = (ws, store) => evt => {
		// store.dispatch(push('/login'));
		let msg = JSON.parse(evt.data);

		switch(msg.type) {
			case 'navigation':
				const route = parseNavigationRequest(msg.content);
				store.dispatch(push(route));
				store.dispatch(actions.receiveMessage(evt.data));
				break;

			case 'stock':
				console.log('stock' + msg.content);
				const stockName = msg.content;
				store.dispatch(fetchStock(stockName));
				break;
		}
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
