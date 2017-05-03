const initialState = {
	connected: false,
	connecting: false
};

export const ws = (state=initialState, action) => {
	switch(action.type) {
		case 'CONNECTED':
			return { ...state, connected: true, connecting: false };
		case 'CONNECTING':
			return { ...state, connecting: true, connected: false };
		case 'DISCONNECT':
			return { ...state, connecting: false, connected: false };
		default:
			return state
	}
}
