export function connected() {
    return {
        type: 'CONNECTED'
    }
}

export function connecting() {
    console.log("connecting");
    return {
        type: 'CONNECTING'
    }
}

export function disconnected() {
    return {
        type: 'DISCONNECTED'
    }
}

export function connect() {
    return {
        type: 'CONNECT'
    }
}

export function disconnect() {
    return {
        type: 'DISCONNECT'
    }
}


export function receiveMessage(msg) {
    console.log(msg);
    return {
        type: 'MESSAGE_RECEIVED',
        msg
    }
}
