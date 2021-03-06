import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import ready from 'domready'
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.global.css';
import * as actions from './actions/websocket';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);


store.dispatch(actions.connect());

ready(()=>{

  render(
	<Provider store={store}>
	  <Router history={history} routes={routes} />
	</Provider>,
	document.getElementById('root')
  );
});
