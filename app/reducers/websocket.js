export function websocket(state = { isConnected: false}, action){
  console.log(action.type);
  switch (action.type){
	case 'CONNECTED':
	  return Object.assign({}, state, {
		isConnected: true
	  })
	default:
	  return state
  }
}
