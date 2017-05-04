import { push } from 'react-router-redux';
import { EVENT_SERVER_SOCKET_ADDRESS } from './../constants/config';
import * as actions from './../actions/SocketActions';
import * as types from './../constants/ActionTypes';
import { parseNavigationRequest } from './../utils/AlexaParser';
import { fetchStock } from './../actions/stock';
import { 
	hideFace, 
	showFace, 
	updateTraining, 
	addPersonRequest, 
	fetchPersonName ,
	trainingRequest
} from './../actions/facialAuth';


/**
 * This socket communicate with Event Emitter server 
 * Purpose is the communication gateway between the client and Alexa
 *
 */
const wsMiddleware = (function(){
	let socket = null;

	const onSocketOpen = (ws, store, token) => evt => {
		store.dispatch(actions.connected());
	}

	const onSocketClose = (ws, store) => evt => {
		store.dispatch(actions.disconnected());
	}


	const onSocketMessage = (ws, store) => evt => {
		let msg = JSON.parse(evt.data);
		console.log(msg);

		switch(msg.type) {
			case 'training':
				const option = msg.content == 'on';
				console.log("DISPATCHING option :" + option);
				store.dispatch(updateTraining(option));
				if (option) {
					store.dispatch(trainingRequest());
				}
				break;
			case 'navigation':
				const route = parseNavigationRequest(msg.content);
				console.log("Navigating to" + route);
				store.dispatch(push(route));
				store.dispatch(actions.receiveMessage(evt.data));
				break;

			case 'stock':
				console.log('stock' + msg.content);
				const stockName = msg.content;
				store.dispatch(fetchStock(stockName));
				break;

			case 'signup':
				console.log("Signing up a user with name: " + msg.content);
				const name = msg.content;
				store.dispatch(fetchPersonName(name));
				store.dispatch(addPersonRequest());
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
				socket = new WebSocket(EVENT_SERVER_SOCKET_ADDRESS);
				socket.onmessage = onSocketMessage(socket, store);
				socket.onopen = onSocketOpen(socket, store, action.token);
				socket.onclose = onSocketClose(socket, store);
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
