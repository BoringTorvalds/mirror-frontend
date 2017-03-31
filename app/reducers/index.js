// @flow
import { combineReducers } from 'redux';
import { websocket } from './websocket';
import { weather } from './weather';
import { hn } from './hn';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  routing,
  websocket,
  hn,
  weather
});

export default rootReducer;
