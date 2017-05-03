
export const connected = () => ({
	type: 'CONNECTED'
});

export function connecting() {
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

export const connectionFailure = (error)=> ({
  type: 'CONNECTION_FAILURE',
  error: error
})

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
