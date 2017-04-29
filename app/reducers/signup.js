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
			return Object.assign({}, state, {
				isFetching: false,
				isFetched: true,
				person: action.person
			});
		case FETCH_PERSON_NAME_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isFetched: false
			});
		case UPDATE_TRAINING:
			return Object.assign({}, state, {
				training: action.training
			});
		case UPDATE_COUNTS:
			return Object.assign({}, state, {
				counts: action.counts
			});
		default:
			return state
	}
}
