// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';


export default (
  <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signin" component={Login} />
  </Route>
);
