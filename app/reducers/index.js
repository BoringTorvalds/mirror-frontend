// @flow
import { combineReducers } from 'redux';
import { websocket } from './websocket';
import { weather } from './weather';
import { hn } from './hn';
import { stock } from './stock';
import { signup } from './signup';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  routing,
	websocket,
	stock,
	signup,
  hn,
  weather
});

export default rootReducer;
