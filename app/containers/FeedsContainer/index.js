import React, {Component, PropTypes} from 'react'; 
import {connect} from 'react-redux';
import {PAGE_SIZE} from './../../constants/config';
import {fetchAllItems, fetchPagination } from './../../actions/hn';
import Spinner from './../../components/Spinner';
import HNStoryListItem from './../../components/HNStoryListItem';
import NewsIcon from './news-icon.png';
import HNIcon from './hn-icon.png';
import styles from './FeedsContainer.css';

class FeedsContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { pagination } = this.props;
		this.props.dispatch(fetchAllItems(pagination));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.offSet != nextProps.offSet) {
			nextProps.dispatch(fetchAllItems(nextProps.pagination));
		}
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
		this.props.dispatch(fetchPagination({next: true, previous: false}));
	}

	renderhn = (items) => {
		const {pagination} = this.props;
		const stories = items.map((each,ind) => 
			<HNStoryListItem 
				key={each.id} 
				i={parseInt(ind + pagination.offSet*pagination.pageSize)} 
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
			items,
			pagination
		} = this.props;


		if (isFetched && items.length > 0){
			return(
				<div className={styles.container}>
					{this.renderhn(items)}
				</div>
			);
		} else {
			return (
				<div className={styles.container}>
					{	this.renderEmptyView()}
				</div>
			);
		}
	}
}

FeedsContainer.propTypes = {
	isFetched: PropTypes.boolean,
	isFetching: PropTypes.boolean,
	items: PropTypes.any,
	pagination: PropTypes.object,
	offSet: PropTypes.number
};


const mapStateToProps = ({hn}) => {
	return {
		...hn,
		offSet: hn.pagination.offSet
	}
};

export default connect(mapStateToProps)(FeedsContainer);


