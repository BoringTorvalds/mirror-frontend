import * as ActionTypes from './../constants/ActionTypes';

export function detectNewFace(points) {
	return {
		type: ActionTypes.NEW_FACE_DETECTED,
		face: points
	}
}

export function updateIdentity(newIdentity) {
	return {
		type: ActionTypes.UPDATE_IDENTITY,
		identity: newIdentity
	}
}

export function updateModels(openface) {
	return {
		type: UPDATE_MODELS,
		openface: openface
	}
}

export function updateTraining(status) {
	return {
		type: ActionTypes.UPDATE_TRAINING,
		training: status
	}
}

export function addPersonRequest() {
	return {
		type: ActionTypes.ADD_PERSON_REQUEST
	}
}

export function addPersonFinished() {
	return {
		type: ActionTypes.ADD_PERSON_FINISHED
	}
}

export function addPersonFailure(err) {
	return {
		type: ActionTypes.ADD_PERSON_FAILURE,
		error: err
	}
}

export function fetchPersonName(name) {
	return {
		type: ActionTypes.FETCH_PERSON_NAME_SUCCESS,
		person: name
	}
}

export function showFace() {
	return {
		type: ActionTypes.SHOW_FACE
	}
}

export function hideFace() {
	return {
		type: ActionTypes.HIDE_FACE
	}
}

export function trainingRequest() {
	return {
		type: ActionTypes.TRAINING_REQUEST
	}
}

export function trainingFinished() {
	return {
		type: ActionTypes.TRAINING_FINISHED
	}
}

export function resetModel() {
	const resetModel = {
		training: false,
		hideFace: true,
		face: [],
		counts: 0,
		isTrainingRequest: false,
		isTrainingFinished: false,
		add: false,
		person: null
	};
	return {
		type: ActionTypes.RESET_MODEL,
		model: resetModel
	}
}

export function setDebug() {
	return {
		type: ActionTypes.TOGLE_DEBUG
	}
}
