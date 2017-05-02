import { 
	NEW_FACE_DETECTED,
	UPDATE_IDENTITY,
	UPDATE_TRAINING,
	ADD_PERSON_REQUEST,
	ADD_PERSON_FINISHED,
	ADD_PERSON_FAILURE,
	FETCH_PERSON_NAME_SUCCESS
} from './../constants/ActionTypes';

export function detectNewFace() {
	return {
		type: NEW_FACE_DETECTED
	}
}

export function updateIdentity(newIdentity) {
	return {
		type: UPDATE_IDENTITY,
		identity: newIdentity
	}
}

export function updateTraining(status) {
	return {
		type: UPDATE_TRAINING,
		training: status
	}
}

export function addPersonRequest() {
	return {
		type: ADD_PERSON_REQUEST
	}
}

export function addPersonFinished() {
	return {
		type: ADD_PERSON_FINISHED
	}
}

export function addPersonFailure(err) {
	return {
		type: ADD_PERSON_FAILURE,
		error: err
	}
}

export function fetchPersonName(name) {
	return {
		type: FETCH_PERSON_NAME_SUCCESS,
		person: name
	}
}
