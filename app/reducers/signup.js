import {
	FETCH_PERSON_NAME_FAILURE,
	FETCH_PERSON_NAME_SUCCESS,
	FETCH_PERSON_NAME_REQUEST,
	UPDATE_TRAINING,
	UPDATE_COUNTS
} from './../constants/ActionTypes';

const initialState = {
	person: {
		name: null
	},
	isFetching: false,
	isFetched: false,
	training: false,
	counts: 0
}

export const signup = (state=initialState, action) => {
	switch (action.type) {
		case FETCH_PERSON_NAME_SUCCESS:
			return { ...state, person: action.person, isFetching: false, isFetched: true };
		case FETCH_PERSON_NAME_REQUEST:
			return { ...state, isFetching: true, isFetched: false };
		case UPDATE_TRAINING:
			return { ...state, training: action.training };
		case UPDATE_COUNTS:
			return { ...state, counts: action.counts };
		default:
			return state
	}
}
