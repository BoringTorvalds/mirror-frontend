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
        switch(msg.type) {
        case "Hello":
            store.dispatch(actions.loginRequest());
            break;
        default:
            console.log("Received unknown message" + msg.type);
            break;
        }
    }

    return store => next => action => {
        switch(action.type) {
        case 'CONNECT':
            if (socket != null) {
                socket.close();
            }
            store.dispatch(actions.connecting());
            socket = new WebSocket(action.url);
            socket.onmessage = onMessage(socket,store);
            socket.onclose = onClose(socket,store);
            socket.onopen = onOpen(socket, store, action.token);
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

