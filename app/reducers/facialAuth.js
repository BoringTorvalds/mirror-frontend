import {
	NEW_FACE_DETECTED,
	UPDATE_IDENTITY,
	UPDATE_TRAINING,
	ADD_PERSON_REQUEST,
	ADD_PERSON_FINISHED,
	FETCH_PERSON_NAME_SUCCESS
} from './../constants/ActionTypes';

const initialState = {
	training: false,
	counts: 0,
	currentIdentity: "Unknown person",
	person: null,
	add: false
};

export function facialAuth(state = initialState, action) {
	switch (action.type) {
		case NEW_FACE_DETECTED:
			return { ...state, counts: state.counts + 1 };
		case FETCH_PERSON_NAME_SUCCESS:
			return { ...state, person: action.person };
		case UPDATE_IDENTITY:
			return { ...state, currentIdentity: action.identity };
		case UPDATE_TRAINING:
			return { ...state, training: action.training };
		case ADD_PERSON_REQUEST:
			return { ...state, add: true };
		case ADD_PERSON_FINISHED:
			return { ...state, add: false };
		default:
			return state;
	}
}