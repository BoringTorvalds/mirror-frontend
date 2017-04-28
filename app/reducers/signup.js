import {
	FETCH_PERSON_NAME_FAILURE,
	FETCH_PERSON_NAME_SUCCESS,
	FETCH_PERSON_NAME_REQUEST
} from './../constants/ActionTypes';

const initialState = {
	person: {
		name: null
	},
	isFetching: false,
	isFetched: false
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
		default:
			return state
	}
}
