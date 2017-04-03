import React, {Component} from 'react';
import styles from './SignIn.css';
import Setting from './../components/Setting';
import {PageHeader} from 'react-bootstrap';

export default class SignIn extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<div className={styles.container}>
					<PageHeader> Authenticating ... </PageHeader>
				</div>
				<Setting />
			</div>
		)
	}
}
