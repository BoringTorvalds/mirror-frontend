import * as types from '../constants/ActionTypes';

export function connected() {
    return {
        type: types.CONNECTED
    }
}

export function connecting() {
    return {
        type: types.CONNECTING
    }
}

export function disconnected() {
    return {
        type: types.DISCONNECTED
    }
}

export function connect() {
    return {
        type: types.CONNECT
    }
}

export function disconnect() {
    return {
        type: types.DISCONNECT
    }
}


export function receiveMessage(msg) {
  console.log(msg);
    return {
        type: types.RECEIVE_MESSAGE,
        msg
    }
}
