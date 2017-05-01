import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Trend from 'react-trend';
import Spinner from './../components/Spinner';
import { fetchStock } from './../actions/stock';

class StockContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(fetchStock());
	}

	_getStock = ({Elements}) => {
		return Elements[1].DataSeries.volume.values;
	}

	_renderRange = ({Elements}) => {
		const { 
			low, 
			high, 
			close 
		} = Elements[0].DataSeries;
		return (
			<div>  
				Low : ${low.max} <br/>
				High : ${high.max} <br/>
				Close : ${close.max}
			</div>
		)
	}

	_getStockName = ({Elements}) => {
		return Elements[0].Symbol;
	}

	render() {
		const {
			isFetched,
			isFetching,
			data
		} = this.props.stock;
		if (isFetched) {
			return(
				<div> 
					{this._getStockName(data)}
					<Trend 
						data={this._getStock(data)} 
						autoDraw
						autoDrawDuration={3000}
						autoDrawEasing="ease-in"
						gradient={['#0FF', '#F0F', '#FF0']}
					/>
					{this._renderRange(data)}
				</div>
			)
		} else if (isFetching){
			return <Spinner width="50" height="50"/> 
		} 
		return null;
	}
}
StockContainer.propTypes = {
	stock: PropTypes.object
}
const mapStateToProps = (state) => {
	return {
		stock: state.stock
	}
}
export default connect(mapStateToProps)(StockContainer);
