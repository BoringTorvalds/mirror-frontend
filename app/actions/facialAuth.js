import { 
	NEW_FACE_DETECTED,
	UPDATE_IDENTITY
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
