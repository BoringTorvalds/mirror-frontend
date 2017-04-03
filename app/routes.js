// @flow
import React from 'react';
import { Route,Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Setting from './containers/Setting';
import SignUp from './containers/SignUp';
import SignIn from './containers/Signin';

export default (
  <Route path="/" component={App}>
	<IndexRoute component={Home} />
	<Route path="home" component={Home} />
	<Route path="login" component={SignIn} />
	<Route path="signup" component={SignUp} />
	<Route path="setting" component={Setting} />
  </Route>
);
