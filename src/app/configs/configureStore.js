import { fromJS } from 'immutable';
import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../redux/';

/**
 * configuring redux store.
 * @param storeState
 * @param middleware
 */
export default function createStore(storeState, middleware = []) {
  const initialState = fromJS(storeState);
  let middlewareToUse = null;
  middleware.push(thunkMiddleware);

  if (process.env.NODE_ENV === 'production') {
    middlewareToUse = compose(
      applyMiddleware( ...middleware )
    );
  } else {
    middleware.push(createLogger({
      stateTransformer: state => state.toJS ? state.toJS() : state,
      actionTransformer: action => (action.payload && action.payload.toJS) ? action.payload.toJS() : action
    }));
    middlewareToUse = compose(
      applyMiddleware( ...middleware),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
        ? window.devToolsExtension() : f => f
    );
  }

  return createReduxStore(
    rootReducer,
    initialState,
    middlewareToUse
  );
}
