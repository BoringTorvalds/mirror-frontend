// Rewrite from insin/react-hn
import fetch from 'isomorphic-fetch';
import {
	MAX_THREAD_NUMBER,
	HN_API_URL
} from './../constants/config';

const options = {
	method: 'GET',
	headers: {
		'Accept': 'application/json'
	}
}

export function itemRefJSON(id) {
	return new Promise((resolve,reject) => {
		itemRef(id)
			.then((response) => {
				if (response.status >= 400) {
					reject(new Error("Bad response from server"));
				}
				resolve(response.json());
			});
	});
}
export function itemRef(id) {
	return fetch(HN_API_URL + '/item/' + id + '.json', options);
}
export function fetchItem(id, cb) {

}

export function fetchAllItems() {
	return fetch(HN_API_URL + 'topstories.json', options);
}

export function fetchContents() {
	return new Promise((resolve, reject) => {
		fetchAllItems()
			.then((response) =>{
				if (response.status > 400) {
					reject(new Error("Bad request"));
				}
				resolve(response.json());
			})
	})
}

export function fetchAllItemsJSON(itemIds){
	return new Promise((resolve, reject) => {
		fetchContents()
			.then((itemIds) => {
				itemIds = itemIds.slice(0,10)
				const promises = itemIds.map(id => itemRefJSON(id));
				return Promise.all(promises);
			})
			.then(items => resolve(items))
			.catch(err => resolve(err));
	});
}


