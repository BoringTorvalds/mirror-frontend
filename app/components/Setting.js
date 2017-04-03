import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './Setting.css';
import settingIcon from './setting-icon.png';

export default class Setting extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return(
			<Link to="/setting">
				<div className={styles.setting}>
					<img src={settingIcon} />
					<p className={styles.inline}> echo "Mirror, show my settings" </p>
				</div>
			</Link>
		)
	}
}

