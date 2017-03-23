// @flow
import { combineReducers } from 'redux';
import { websocket } from './websocket';
import { weather } from './weather';
import { routerReducer as routing } from 'react-router-redux';

const rootReducer = combineReducers({
  routing,
  websocket,
  weather
});

export default rootReducer;
