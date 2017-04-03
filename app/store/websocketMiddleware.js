import { routerMiddleware, push } from 'react-router-redux';

const websocketMiddleware = (function() {
	let socket = null;

	const onOpen = (ws, store, token) => ev => {
		store.dispatch(actions.connected());
	}

	const onClose = (ws, store) => ev => {
		store.dispatch(actions.disconnected());
	}

	const onMessage = (ws, store) => ev => {
		let msg = JSON.parse(ev.data);
		store.dispatch(actions.receiveMessage("HEYYYY"));
	}

	return store => next => action => {
		switch(action.type) {
			case 'CONNECTION_FAILURE':
				return Object.assign({}, store.state, {
					connectionError: action.error
				});
				break;
			case 'CONNECT':
				if (socket != null) {
					socket.close();
				}
				store.dispatch(actions.connecting());
				console.log("CONNECTING TO WS");
				socket = new WebSocket(action.url);
				if (socket != null) {
					store.dispatch(actions.connected());
					socket.onmessage = onMessage(socket,store);
					socket.onclose = onClose(socket,store);
					socket.onopen = onOpen(socket, store, action.token);
				} else {
					store.dispatch(actions.connectionFailure("WS not available"));
				}
				break;

			case 'DISCONNECT':
				if (socket != null) {
					socket.close();
				}
				socket = null;
				store.dispatch(actions.disconnected());
				break;


			default:
				return next(action);

		}

	}
})();

export default websocketMiddleware

