import React, {Component} from 'react';
import Clock from './../components/Clock';
import { Link } from 'react-router';
import styles from './Setting.css';
import {
	Grid,
	Row,
	Col
} from 'react-bootstrap';

export default class Setting extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<Grid fluid>
				<Col smOffset={4} mdOffset={4} lgOffset={4} sm={4} md={4} lg={4}>
					<div className={styles.container}>
						<Link className={styles.textWhite} to="/signup"> New Profile </Link> <br/>
						<Link className={styles.textWhite} to="/login"> Profile </Link>
					</div>
				</Col>
				<Col sm={4} md={4} lg={4}>
					<Clock />
				</Col>
			</Grid>
		);
	}
}

