import React, {Component} from 'react';
import styles from './styles.css';

export default ({radius, percentage, strokeWidth }) => {
	const r = radius - strokeWidth / 2;
	const width = radius * 2;
	const height = radius * 2;
	const viewBox = `0 0 ${width} ${height}`;
	const dashArray = r* Math.PI * 2;
	const dashOffset = dashArray - dashArray * percentage / 100;
	const percent = percentage > 100 ? 100 : percentage;

	return (
		<svg
			className={styles.CircularProgress}
			width={radius * 2}
			height={radius * 2}
			viewBox={viewBox}>
			<circle
				className={styles["CircularProgress-Bg"]}
				cx={radius}
				cy={radius}
				r={radius}
				strokeWidth={`${strokeWidth}px`} />
			<circle
				className={styles["CircularProgress-Fg"]}
				cx={radius}
				cy={radius}
				r={radius}
				strokeWidth={`${strokeWidth}px`}
				style={{
					strokeDasharray: dashArray,
					strokeDashoffset: dashOffset
				}} />
			<text
				className={styles["CircularProgress-Text"]}
				x={radius}
				y={radius}
				dy=".4em"
				textAnchor="middle">
				{`${percent}%`}
			</text>
		</svg>
	);
}
