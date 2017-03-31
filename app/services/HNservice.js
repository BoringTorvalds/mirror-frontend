// Rewrite from insin/react-hn

import Firebase from 'firebase';

import {
  MAX_THREAD_NUMBER,
  HN_API_URL
} from './../constants';

let api = new Firebase(HN_API_URL);

/**
 * Construct path for querying item 
 *
 * @param {String} id of item
 * @return {Object} firebase item 
 */
export function itemRef(id) {
  return api.child('item/' + id);
}

/**
 * Query for the item
 *
 * @param {string} item id
 * @return {Promise} item
 */
export function getItem (itemId) {
  return new Promise((reject,resolve) => {
	itemRef(itemId).once('value', (snapshot) => {
	  if (!snapshot) {
		reject(new Error("Item not found"));
	  }
	  resolve(snapshot.val());
	})
  });
}
export function getItems (itemIds) {
  let items = new Map();
  const promises = itemsId.map(itemId => getItem(itemId));
  return Promise.all(promises);
}
