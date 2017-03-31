import React from 'react';

export default (props) => {
  const {
	by,
	score,
	time,
	title,
	url
  } = props;
  return (
	<div> {title} <br/> {by}</div> 
  )
}
