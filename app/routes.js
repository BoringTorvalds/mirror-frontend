// @flow
import React from 'react';
import { Route,Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

export default (
  <Route path="/" component={App}>
	<IndexRoute component={Home} />
	<Route path="home" component={Home} />
	<Route path="login" component={Login} />
	<Route path="signup" component={SignUp} />
  </Route>
);
