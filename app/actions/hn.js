import * as HNservice from './../services/HNservice';
import {
  FETCH_HN_SUCCESS,
  FETCH_HN_FAILURE,
  FETCH_HN_REQUEST
} from './../constants/ActionTypes';

export const fetchHNSuccess = (hn) => {
  return {
	type: FETCH_HN_SUCCESS,
	items: hn
  }
}

export const fetchHNFailure = (error) => {
  return {
	type: FETCH_HN_FAILURE,
	error
  }
}

export const fetchHNRequest = () => {
  return {
	type: FETCH_HN_REQUEST
  }
}

export const fetchAllItems = (options) => {
  return dispatch => {
	HNservice
	  .fetchAllItemsJSON(options)
	  .then(json => dispatch(fetchHNSuccess(json)))
	  .catch(error => dispatch(fetchHNFailure(error)))
  }
}
