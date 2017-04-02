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
	return (
		<div> {i}. {title} <br/> {by}</div> 
	)
}
