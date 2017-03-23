import React, { Component } from 'react';
import { hashHistory } from 'react-router';

export default class Base extends Component { 
  constructor(props) {
	super(props);
  }

  navigateTo() {
	hashHistory.push('/');
  }

}
