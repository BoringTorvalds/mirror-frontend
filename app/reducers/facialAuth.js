import * as ActionTypes from './../constants/ActionTypes';

const initialState = {
	training: false,
	hideFace: true,
	counts: 0,
	currentIdentity: "Unknown person",
	person: null,
	add: false,
	trainingRequest: false,
	trainingFinished: false
};

export function facialAuth(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.NEW_FACE_DETECTED:
			return { ...state, counts: state.counts + 1 };
		case ActionTypes.FETCH_PERSON_NAME_SUCCESS:
			return { ...state, person: action.person };
		case ActionTypes.UPDATE_IDENTITY:
			return { ...state, currentIdentity: action.identity };
		case ActionTypes.UPDATE_TRAINING:
			return { ...state, training: action.training };
		case ActionTypes.ADD_PERSON_REQUEST:
			return { ...state, add: true };
		case ActionTypes.ADD_PERSON_FINISHED:
			return { ...state, add: false };
		case ActionTypes.ADD_PERSON_FAILURE:
			return { ...state, error: action.error};
		case ActionTypes.HIDE_FACE:
			return { ...state, hideFace: true };
		case ActionTypes.SHOW_FACE:
			return { ...state, hideFace: false };
		case ActionTypes.TRAINING_REQUEST:
			return { ...state, trainingRequest: true, trainingFinished: false };
		case ActionTypes.TRAINING_FINISHED:
			return { ...state, trainingFinished: true, trainingRequest: false };
		default:
			return state;
	}
}