// @flow
import React from 'react';
import { Route,Router, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import FaceContainer from './containers/LoginContainer';
import Setting from './containers/Setting';
import SignUp from './containers/SignUp';
import SignInContainer from './containers/SignInContainer';
import BlankContainer from './containers/BlankContainer';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="off" component={BlankContainer} />
		<Route path="home" component={Home} />
		<Route path="on" component={Home} />
		<Route path="login" component={FaceContainer} />
		<Route path="signup" component={SignUp} />
		<Route path="setting" component={Setting} />
	</Route>
);
