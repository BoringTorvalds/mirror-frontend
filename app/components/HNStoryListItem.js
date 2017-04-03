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
		<div> {i+1}. {title}  ({url})<br/> <div style={primaryGreen}> By {by}</div></div> 
	)
}
