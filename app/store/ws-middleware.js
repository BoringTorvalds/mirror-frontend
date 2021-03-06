import { push } from 'react-router-redux';
import { EVENT_SERVER_SOCKET_ADDRESS } from './../constants/config';
import * as actions from './../actions/SocketActions';
import * as types from './../constants/ActionTypes';
import { parseNavigationRequest } from './../utils/AlexaParser';
import { fetchStock, fetchStockSymbol } from './../actions/stock';
import { 
	hideFace, 
	showFace, 
	setDebug,
	updateTraining, 
	addPersonRequest, 
	fetchPersonName ,
	trainingRequest,
	resetModel,
} from './../actions/facialAuth';
import { fetchPagination } from './../actions/hn';
import { fetchLocationWeather, fetchFullWeather } from './../actions/weather';

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

		/**
		 * Listen to events coming from EventEmitter socket
		 * Dispatch to Redux state change and actions needed 
		 */
		switch(msg.type) {
			// Set training on or off
			case 'training':
				const option = msg.content == 'on';
				console.log("DISPATCHING option :" + option);
				store.dispatch(updateTraining(option));
				if (option) {
					store.dispatch(trainingRequest());
				}
				break;
			// Navigate to a page
			case 'navigation':
				if (msg.content == "debug"){
					store.dispatch(setDebug());
					break;
				}
				const route = parseNavigationRequest(msg.content);
				console.log("Navigating to" + route);
				if (route == "/signup"){
					store.dispatch(resetModel());
				}
				store.dispatch(push(route));
				store.dispatch(actions.receiveMessage(evt.data));
				break;
			// Display weather of specific location
			case 'weather':
				const location = msg.content;
				store.dispatch(fetchLocationWeather(location));
				break;
				// Display stock
			case 'full_weather':
				if (msg.content == 'off') {
					store.dispatch(fetchFullWeather({width: null, height: null}));
				} else {
					store.dispatch(fetchFullWeather({width: "1000", height: "2000"}));
				}
				break;
			// Start signup with a given name
			case 'signup':
				console.log("Signing up a user with name: " + msg.content);
				const name = msg.content;
				store.dispatch(fetchPersonName(name));
				store.dispatch(addPersonRequest());
				break;
			case 'feeds':
				if (msg.content == 'more') {
					store.dispatch(fetchPagination({next: true, previous: false}));
				} else if (msg.content == 'previous'){
					store.dispatch(fetchPagination({previous: true, next:false }));
				}
				break;
			case 'stock':
				// Look up stock
				const content = msg.content.split('/');
				store.dispatch(fetchStockSymbol({
					symbol: content[1],
					title: content[0],
					exchange: content[2]
				}));
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
