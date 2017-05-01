import React from 'react';
import SpinnerSVG from './Spinner.svg';
export default ({height, width}) => {
	return <img height={height} width={width} src={SpinnerSVG} />;
}
