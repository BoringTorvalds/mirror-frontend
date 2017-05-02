import React, { Component, PropTypes } from 'react'; 
import { connect } from 'react-redux';
import {
	PAGE_SIZE
} from './../../constants/config';
import {
	fetchAllItems
} from './../../actions/hn';
import Spinner from './../../components/Spinner';
import HNStoryListItem from './../../components/HNStoryListItem';
import NewsIcon from './news-icon.png';
import HNIcon from './hn-icon.png';
import styles from './FeedsContainer.css';

class FeedsContainer extends Component {
	constructor(props) {
		super(props);
		this.filter = {
			offSet: 0,
			pageSize: PAGE_SIZE
		};
	}

	componentDidMount() {
		this.props.dispatch(fetchAllItems())
	}

	renderEmptyView() {
		return (
			<div style={{textAlign: "center"}}> Loading news ... <br/>
				<Spinner 
					height='100'
					width='100'
				/>
			</div>
		)
	}

	/**
	 * Fetch next stories of next page
	 */
	_fetchFeeds = () => {
		this.filter.offSet++;
		this.props.dispatch(fetchAllItems(this.filter));
	}

	renderhn = (items) => {
		const stories = items.map((each,ind) => 
			<HNStoryListItem 
				key={each.id} 
				i={parseInt(ind + this.filter.offSet*this.filter.pageSize)} 
				{...each} 
			/> 
		);
		return (
			<div>
				<div className={styles.header}>
					<img src={HNIcon} />
					<div className={styles.align}> TRENDING NEWS </div>
				</div>
				{stories}
				<div 
					onClick={this._fetchFeeds}
					className={styles.header}
				> 
					Show More 
				</div>
			</div>
		)
	}

	render() {
		const {
			isFetching,
			isFetched,
			items
		} = this.props.hn;
		return(
			<div className={styles.container}>
				{ isFetched && this.renderhn(items) }
				{ isFetching &&  this.renderEmptyView() }
			</div>
		)
	}
}

FeedsContainer.propTypes = {
	hn: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		hn: state.hn
	}
};

export default connect(mapStateToProps)(FeedsContainer);


