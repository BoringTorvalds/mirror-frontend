import React, {Component} from 'react';

const SHAPE_FACE = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,26,25,24,18,17,0];
const SHAPE_EYE_LEFT = [[36,41],[36,37],[37,38],[38,39],[39,40],[40,41],[41,38],[40,37]];
const SHAPE_EYE_RIGHT = [[42,47],[47,44],[46,47],[46,45],[44,45],[43,44],[43,42],[43,47],[46,43],[46,44]];
const SHAPE_NOSE = [[27,31],[27,35],[31,32],[32,33],[33,34],[34,35],[29,35],[31,29]];
const SHAPE_MOUTH = [[49,50],[50,51],[51,52],[52,53],[53,54],[49,48],[49,31],[53,35],[60,64],[60,59],[58,59],[57,58],[56,57],[55,56],[55,64],[53,64],[35,53],[35,54],[48,31],[61,62],[62,63],[63,65],[65,66],[66,67],[67,61]];
const SHAPE_CONNECT = [[39,27],[27,42],[39,31],[42,35], [31,30],[35,30],[31,29],[35,29],[28,35]];
const SHAPE_SURROUND = [[19,38],[38,21],[37,19],[37,17],[36,17],[36,0],[36,1],[2,31],[31,4],[48,4],[48,6],[6,58],[57,9],[55,11],[11,54],[54,13],[35,14],[14,45],[45,26],[44,24],[22,42],[42,23],[24,19],[20,23]];


class FaceFrame extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.updateCanvas();
	}

	componentWillUnmount() {
	}
	componentWillUpdate(nextProps, nextState) {
	}

	updateCanvas = ()=> {
		const ctx = this.refs.canvas.getContext('2d');
		const { w, h} = this.props;
		let {points,title} = this.props;
		points = points.map((p) => [p[0]*w*1.2/400,p[1]*h*1.2/300]);

		ctx.clearRect(0, 0, w, h);
		ctx.strokeStyle="#eae25a";
		ctx.fillStyle="#eae25a";

		ctx.font = '24px HelveticaNeue-UltraLight';
		ctx.fillText(title, points[18][0] + 100, points[18][1] - 50);

		for (let i=1; i<SHAPE_FACE.length; i++) {
			ctx.beginPath();
			ctx.moveTo(...points[SHAPE_FACE[i]]);
			ctx.lineTo(...points[SHAPE_FACE[i-1]]);
			ctx.stroke();
		}

		points.forEach((p) => {
			ctx.fillRect(...p,1,1);
		});

		SHAPE_CONNECT.forEach((p) => {
			ctx.beginPath();
			ctx.moveTo(...points[p[0]]);
			ctx.lineTo(...points[p[1]]);
			ctx.stroke();
		});
		SHAPE_SURROUND.forEach((p) => {
			ctx.beginPath();
			ctx.moveTo(...points[p[0]]);
			ctx.lineTo(...points[p[1]]);
			ctx.stroke();
		});
		SHAPE_MOUTH.forEach((p) => {
			ctx.beginPath();
			ctx.moveTo(...points[p[0]]);
			ctx.lineTo(...points[p[1]]);
			ctx.stroke();
		});
		SHAPE_NOSE.forEach((p) => {
			ctx.beginPath();
			ctx.moveTo(...points[p[0]]);
			ctx.lineTo(...points[p[1]]);
			ctx.stroke();
		});
		SHAPE_EYE_RIGHT.forEach((p) => {
			ctx.beginPath();
			ctx.moveTo(...points[p[0]]);
			ctx.lineTo(...points[p[1]]);
			ctx.stroke();
		});
		SHAPE_EYE_LEFT.forEach((p) => {
			ctx.beginPath();
			ctx.moveTo(...points[p[0]]);
			ctx.lineTo(...points[p[1]]);
			ctx.stroke();
		});
	}

	render() {
		const { w,h } = this.props;
		return(
			<canvas 
				ref="canvas" 
				width={w}
				height={h}
				style={{position: "absolute"}}
			/>
		);
	}
}

FaceFrame.propTypes = {
	points: React.PropTypes.any,
	title: React.PropTypes.string,
	w: React.PropTypes.number,
	h: React.PropTypes.number
};

export default FaceFrame;
