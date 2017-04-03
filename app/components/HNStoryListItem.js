import React from 'react';

export default (props) => {
	const {
		by,
		score,
		time,
		title,
		url,
		i
	} = props;

	const primaryGreen = { color: "#50E3C2"};
	return (
		<div> {i+1}. {title }<div style={primaryGreen}> ({url}) </div> By {by}<br/> <br/></div>
	)
}
