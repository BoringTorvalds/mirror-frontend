import React, { Component, PropTypes } from 'react'; 
import { connect } from 'react-redux';
import HNStoryListItem from './../../components/HNStoryListItem';
import {
	fetchAllItems
} from './../../actions/hn';
import NewsIcon from './news-icon.png';
import HNIcon from './hn-icon.png';
import styles from './FeedsContainer.css';
import Spinner from './../../components/Spinner';
import {
	PAGE_SIZE
} from './../../constants/config';

class FeedsContainer extends Component {
	static propTypes = {
		hn: PropTypes.object
	}
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

	renderhn = () => {
		const stories = this.props.hn.items.map((each,ind) => 
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
					<div className={styles.align}> Hacker News </div>
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
		return(
			<div className={styles.container}>
				{ this.props.hn.isFetched && 
					this.renderhn()
				}
				{ this.props.hn.isFetching &&
					this.renderEmptyView()
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		hn: state.hn
	}
}

export default connect(mapStateToProps)(FeedsContainer);

