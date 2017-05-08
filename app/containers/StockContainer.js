import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Trend from 'react-trend';
import Spinner from './../components/Spinner';
import { fetchStock } from './../actions/stock';
import styled from 'styled-components';

/**
 * React component represents Stock container
 * Display stock fetched from Stock API
 */ 
class StockContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {symbol} = this.props;
		this.props.dispatch(fetchStock(symbol));
	}


	componentWillReceiveProps(nextProps) {
		if (nextProps.symbol != this.props.symbol) {
				nextProps.dispatch(fetchStock(nextProps.symbol));
		}
	}

	/**
	 * Parse stock points from response to draw on graph
	 */
	getStock({Elements}){
		return Elements[1].DataSeries.volume.values;
	}


	/**
	 * Parse low, high , close values of stock
	 */
	renderRange({Elements}){
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

	render() {
		const {
			isFetched,
			isFetching,
			title,
			symbol,
			data,
			exchange
		} = this.props;

		const SymbolText = styled.h2`
			font-weight: bold;
		`
		const StockContainer = styled.div`
			line-height: 0.5;
		`;
		if (isFetched) {
			return(
				<div> 
					<StockContainer>
						<SymbolText> { symbol } </SymbolText> <h3> { title } </h3>
						<h3> { exchange } </h3>
					</StockContainer>

					<Trend 
						data={this.getStock(data)} 
						autoDraw
						autoDrawDuration={3000}
						autoDrawEasing="ease-in"
						gradient={['#0FF', '#F0F', '#FF0']}
					/>
					{this.renderRange(data)}
				</div>
			)
		} else if (isFetching){
			return <Spinner width="50" height="50"/> 
		} 
		return null;
	}
}
StockContainer.propTypes = {
	/** object of data from response */
	data: PropTypes.object,
	/** name of corp */
	title: PropTypes.string,
	/** symbol of stock */
	symbol: PropTypes.string,
	/** name of stock exchange market */
	exchange: PropTypes.string,
	/** is stock fetched */
	isFetched: PropTypes.bool,
	/** is stock fetching */
	isFetching: PropTypes.bool
};
const mapStateToProps = ({stock}) => {
	return {...stock};
}
export default connect(mapStateToProps)(StockContainer);
