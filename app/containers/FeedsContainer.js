import React, { Component, PropTypes } from 'react'; 
import { connect } from 'react-redux';
import HNStoryListItem from './../components/HNStoryListItem';
import {
	fetchAllItems
} from './../actions/hn';

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
		const stories = this.props.hn.items.map(each => <HNStoryListItem id={each.id} {...each} /> );
		return stories;
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


