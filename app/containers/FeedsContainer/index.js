import React, {Component, PropTypes} from 'react'; 
import {connect} from 'react-redux';
import {PAGE_SIZE} from './../../constants/config';
import {fetchAllItems, fetchPagination } from './../../actions/hn';
import Spinner from './../../components/Spinner';
import HNStoryListItem from './../../components/HNStoryListItem';
import NewsIcon from './news-icon.png';
import HNIcon from './hn-icon.png';
import styled from 'styled-components';

/**
 * React Component represents Feeds Container
 * Display news
 * Default source is from HackerNews
 */
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


	/**
	 * Render loading view when news are being fetched
	 */
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
	_fetchFeeds(){
		this.props.dispatch(fetchPagination({next: true, previous: false}));
	}

	/**
	 * Render HN news items 
	 * params {array} list of news items 
	 */
	renderhn(items){
		const {pagination} = this.props;
		const InlineText = styled.div`
			display: inline;
		`;
		const HeaderText = styled.div`
			position: relative;
			font-size: large;
			margin-bottom: 15px;
			color: #fff;
		`;
		const stories = items.map((each,ind) => 
			<HNStoryListItem 
				key={each.id} 
				i={parseInt(ind + pagination.offSet*pagination.pageSize)} 
				{...each} 
			/> 
		);

		return (
			<div>
				<HeaderText>
					<img src={HNIcon} />
					<InlineText> TRENDING NEWS </InlineText>
				</HeaderText>
				{stories}
				<HeaderText onClick={this._fetchFeeds}> Show More 

				</HeaderText>
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

		const Container = styled.div`
				padding: 2em 2em;
		`;


		if (isFetched && items.length > 0){
			return(
				<Container>
					{this.renderhn(items)}
				</Container>
			);
		} else {
			return (
				<Container>
					{	this.renderEmptyView()}
				</Container>
			);
		}
	}
}

FeedsContainer.propTypes = {
	/** Is news already fetched */
	isFetched: PropTypes.bool,
	/** Is news being fetched */
	isFetching: PropTypes.bool,
	/** List of news */
	items: PropTypes.array,
	/** Pagination of current news view */
	pagination: PropTypes.object,
	/** Offet */
	offSet: PropTypes.number
};


const mapStateToProps = ({hn}) => {
	return {
		...hn,
	offSet: hn.pagination.offSet
	}
};

export default connect(mapStateToProps)(FeedsContainer);


