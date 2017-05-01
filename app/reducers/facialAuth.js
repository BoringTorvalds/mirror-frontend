import {
	NEW_FACE_DETECTED,
	UPDATE_IDENTITY
} from './../constants/ActionTypes';

const initialState = {
	training: false,
	counts: 0,
	currentIdentity: "Unknown person"
};

export function facialAuth(state = initialState, action) {
	switch (action.type) {
		case NEW_FACE_DETECTED:{
			return { ...state, counts: state.counts + 1 };
		}
		case UPDATE_IDENTITY:
			return { ...state, currentIdentity: action.identity };
		default:
			return state;
	}
}