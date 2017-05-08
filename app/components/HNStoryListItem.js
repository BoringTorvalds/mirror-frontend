import React from 'react';
/**
 * Stateless react component to hold styles for news item
 */
export default ({by, score, time, title, url, i }) => {
	const primaryGreen = { color: "#fff"};
	return (
		<div> {i+1}. {title }<div style={primaryGreen}> ({url}) </div> <br/></div>
	)
}
