import React, { Component, PropTypes } from 'react'; 
import { connect } from 'react-redux';
import HNStoryListItem from './../components/HNStoryListItem';
import {
	fetchAllItems
} from './../actions/hn';
import NewsIcon from './news-icon.png';
import HNIcon from './hn-icon.png';
import styles from './FeedsContainer.css';

class FeedsContainer extends Component {
	static propTypes = {
		hn: PropTypes.object
	}
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.dispatch(fetchAllItems());
	}

	renderEmptyView() {
		return (
			<div> No hn </div>
		)
	}

	renderhn = () => {
		const stories = this.props.hn.items.map((each,ind) => <HNStoryListItem key={each.id} i={ind} {...each} /> );
		return (
			<div>
				<div className={styles.header}>
					<img src={HNIcon} />
					<div className={styles.align}> Hacker News </div>
				</div>
				{stories}
			</div>
		)
	}

	render() {
		return(
			<div>
				{ this.props.hn.isFetched ? 
					this.renderhn() : 
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


