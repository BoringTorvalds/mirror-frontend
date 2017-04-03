import React, {Component} from 'react';
import Trend from 'react-trend';
import axios from 'axios'

class StockContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		}
	}

	componentDidMount() {
		const params = {  
			parameters: {
			Normalized: false,
			NumberOfDays: 365,
			DataPeriod: "Day",
			Elements: [
			{
				Symbol: 'AAPL',
				Type: "price",
				Params: ["ohlc"] //ohlc, c = close only
			},
			{
				Symbol: 'AAPL',
				Type: "volume"
			}
			]
			}
		};

		let url = 'http://dev.markitondemand.com/Api/v2/InteractiveChart/json';
		axios.get(url, {
			params: params
		})
		.then(json => this._setStock(json.data))
		.catch(err => console.log(err));
	}

	_setStock = (data) => {
		this.setState({data: data.Elements[1].DataSeries.volume.values});
	}

	render() {
		return(
			<div>
				AAPL
				{ this.state.data && <Trend 
					data={this.state.data} 
					autoDraw
					autoDrawDuration={3000}
					autoDrawEasing="ease-in"
					gradient={['#0FF', '#F0F', '#FF0']}
				/>
				}
			</div>
		)
	}
}

export default StockContainer;
