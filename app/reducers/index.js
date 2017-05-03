// @flow
import { combineReducers } from 'redux';
import { weather } from './weather';
import { hn } from './hn';
import { stock } from './stock';
import { signup } from './signup';
import {facialAuth} from './facialAuth';
import { routerReducer as routing } from 'react-router-redux';
import { ws} from './ws';
const rootReducer = combineReducers({
  routing,
	stock,
	signup,
	ws,
  hn,
	weather,
	facialAuth
});

export default rootReducer;
