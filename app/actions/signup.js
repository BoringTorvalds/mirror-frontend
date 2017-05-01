import {
	FETCH_PERSON_NAME_SUCCESS,
	UPDATE_COUNTS
} from './../constants/ActionTypes';

/** 
 * Add a person name to current processing profile
 * Note that this is a temp name
 * If user finished training his/her face profile
 * The record will be saved
 * @param {String} name
 *
 * @return {Object} response
 *	@return {String} response.type
 *	@return {Object} response.person
 *		@return {String} response.person.name
 */
export const fetchPersonName= (name) => {
	return {
		type: FETCH_PERSON_NAME_SUCCESS,
		person: {
			name: name
		}	
	}
}

export const updateProcessedCounts = (newVal) => {
	return {
		type: UPDATE_COUNTS,
		counts: newVal
	}
}
