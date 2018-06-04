import * as types from './types';
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
const defaultState = {
  username: null
};

export default handleActions({
  [ types.SET_USERNAME ]: (state, action) => {
    return state.set('username', action.payload);
  }
}, fromJS(defaultState));
