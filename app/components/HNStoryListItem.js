import React from 'react';

export default ({by, score, time, title, url, i }) => {
	const primaryGreen = { color: "#fff"};
	return (
		<div> {i+1}. {title }<div style={primaryGreen}> ({url}) </div> <br/></div>
	)
}
