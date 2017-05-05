import * as ActionTypes from './../constants/ActionTypes';

const initialState = {
	training: false,
	hideFace: true,
	face: [],
	counts: 0,
	currentIdentity: "Unknown person",
	person: null,
	add: false,
	debug: false,
	isTrainingRequest: false,
	isTrainingFinished: false,
	openface: {
		images:[],
		people:[]
	}
};

export function facialAuth(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.NEW_FACE_DETECTED:
			return { ...state, counts: state.counts + 1, face: action.face };
		case ActionTypes.FETCH_PERSON_NAME_SUCCESS:
			return { ...state, person: action.person };
		case ActionTypes.UPDATE_IDENTITY:{
			return { ...state, currentIdentity: action.identity };
		}
		case ActionTypes.UPDATE_MODELS:{
			return {...state, openface: action.openface };
		}
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
			return { ...state, isTrainingRequest: true, isTrainingFinished: false };
		case ActionTypes.TRAINING_FINISHED:
			return { ...state, isTrainingFinished: true, isTrainingRequest: false };
		case ActionTypes.RESET_MODEL:
			return { ...state, ...action.model };
		case ActionTypes.TOGLE_DEBUG:
			return { ...state, debug: !state.debug };
		default:
			return state;
	}
}