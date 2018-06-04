import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux-immutable';
import account from './account/reducers';

export default combineReducers({
  account,
  routing
});
