import React from 'react';
import SpinnerSVG from './Spinner.svg';
export default (props) => {
	return <img height={props.height} width={props.width} src={SpinnerSVG} />
}
