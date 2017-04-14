import React, {PropTypes, Component} from 'react';
import Trend from 'react-trend';
import axios from 'axios'
import { connect } from 'react-redux';
import {fetchStock } from './../actions/stock';

class StockContainer extends Component {
	static propTypes = {
		stock: PropTypes.object
	}
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		this.props.dispatch(fetchStock());
	}

	_getStock = (data) => {
		return data.Elements[1].DataSeries.volume.values;
	}

	_renderRange = (data) => {
		return (
			<div>  
				Low : ${data.Elements[0].DataSeries.low.max}
				High : ${data.Elements[0].DataSeries.high.max}
				Close : ${data.Elements[0].DataSeries.close.max}
			</div>
		)
	}

	render() {
		return(
			<div>
				AAPL
				{ this.props.stock && <Trend 
					data={this._getStock(this.props.stock.data)} 
					autoDraw
					autoDrawDuration={3000}
					autoDrawEasing="ease-in"
					gradient={['#0FF', '#F0F', '#FF0']}
				/>}

				{ this.props.stock && this._renderRange(this.props.stock.data) }
				
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		stock: state.stock
	}
}
export default connect(mapStateToProps)(StockContainer);
