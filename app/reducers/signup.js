import {
	UPDATE_COUNTS
} from './../constants/ActionTypes';

const initialState = {
	counts: 0
}

export const signup = (state=initialState, action) => {
	switch (action.type) {
		case UPDATE_COUNTS:
			return { ...state, counts: action.counts };
		default:
			return state
	}
}
